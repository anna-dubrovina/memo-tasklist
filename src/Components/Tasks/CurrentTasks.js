import { useContext, useState } from 'react';
import { TasksContext } from '../../Context/taskContext';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Loader from '../UI/Loader';
import ContextMenu from '../UI/ContextMenu';
import styles from './TaskWrapper.module.scss';

const CurrentTasks = (props) => {
  const currentTasks = useContext(TasksContext).tasks.filter((t) => !t.isDone);
  const isLoading = useContext(TasksContext).isLoading;
  const isError = useContext(TasksContext).isError;
  const setIsError = useContext(TasksContext).setIsError;
  const togglePinHandler = useContext(TasksContext).togglePin;
  const toggleDoneHandler = useContext(TasksContext).toggleDone;
  const allDoneHandler = useContext(TasksContext).toggleAllDone;
  const addTaskHandler = useContext(TasksContext).addTask;
  const editTaskHandler = useContext(TasksContext).editTask;
  const deleteTaskHandler = useContext(TasksContext).deleteTask;
  const clearTasksHandler = useContext(TasksContext).clearTasks;

  const [adding, setAdding] = useState(false);
  const [editingData, setEditingData] = useState({
    editingTask: {},
    editing: false,
  });

  const openAddModalHandler = () => {
    setAdding(true);
  };

  const openEditModalHandler = (task) => {
    setEditingData((currentData) => {
      const updatedEditingData = {
        ...currentData,
        editingTask: task,
        editing: true,
      };
      return updatedEditingData;
    });
  };

  const closeModalHandler = () => {
    if (adding) {
      setAdding(false);
    }
    if (editingData.editing) {
      setEditingData({ ...editingData, editingTask: {}, editing: false });
    }
  };

  const closeErrorModalHandler = () => {
    setIsError(false);
  };

  const sortedTasksList = currentTasks.sort((firstEl, secondEl) => {
    let comparingValue;
    if (firstEl.isPinned && secondEl.isPinned) {
      comparingValue = 0;
    }
    if (firstEl.isPinned && !secondEl.isPinned) {
      comparingValue = -1;
    }
    if (!firstEl.isPinned && secondEl.isPinned) {
      comparingValue = 1;
    }
    return comparingValue;
  });

  const currentTasksList = sortedTasksList.map((task) => {
    return (
      <TaskItem
        labelName="Done"
        key={task.id}
        name={task.name}
        description={task.description}
        deadline={task.deadline}
        checked={task.isDone}
        pinned={task.isPinned}
        toggleDone={() => toggleDoneHandler(task)}
        editClick={() => openEditModalHandler(task)}
        deleteClick={() => deleteTaskHandler(task)}
        pinnedClick={() => togglePinHandler(task)}
      />
    );
  });

  let currentTasksContent = (
    <div className={styles.taskWrapper}>
      <header>
        <h1>Current Tasks</h1>
        <Button clicked={openAddModalHandler}>New Task</Button>
      </header>
      <div>{isLoading ? <Loader /> : <h3> You have no current tasks </h3>}</div>
    </div>
  );

  if (currentTasksList.length > 0) {
    currentTasksContent = (
      <div className={styles.taskWrapper}>
        <header>
          <h1>Current Tasks</h1>
          <Button clicked={openAddModalHandler}> New Task</Button>
          <ContextMenu maincontext>
            <div onClick={() => allDoneHandler('current')}>Done All</div>
            <div onClick={() => clearTasksHandler('current')}>Clear All</div>
          </ContextMenu>
        </header>
        <div className={styles.loader}>{isLoading && <Loader />}</div>
        <ul> {currentTasksList}</ul>
      </div>
    );
  }
  return (
    <div>
      <Modal
        show={adding || editingData.editing}
        modalClosed={closeModalHandler}
      >
        <TaskModal
          addingMode={adding}
          editingMode={editingData.editing}
          inputValues={editingData.editingTask}
          closeModal={closeModalHandler}
          addTask={addTaskHandler}
          editTask={editTaskHandler}
        />
      </Modal>
      <Modal show={isError} modalClosed={closeErrorModalHandler}>
        <h3 style={{padding:'16px 0'}}>
          Ooops, something went wrong. Please come back and try again later
        </h3>
        <Button clicked={closeErrorModalHandler} btnType="btnDark"> OK</Button>
      </Modal>
      {currentTasksContent}
    </div>
  );
};

export default CurrentTasks;
