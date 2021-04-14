import { useContext } from 'react';
import { TasksContext } from '../../Context/taskContext';
import TaskItem from './TaskItem';
import Loader from '../UI/Loader';
import ContextMenu from '../UI/ContextMenu';
import styles from './TaskWrapper.module.scss';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const FinishedTask = (props) => {
  const finishedTasks = useContext(TasksContext).tasks.filter((t) => t.isDone);
  const isLoading = useContext(TasksContext).isLoading;
  const isError = useContext(TasksContext).isError;
  const setIsError = useContext(TasksContext).setIsError;
  const toggleDoneHandler = useContext(TasksContext).toggleDone;
  const allRepeatHandler = useContext(TasksContext).toggleAllDone;
  const deleteTaskHandler = useContext(TasksContext).deleteTask;
  const clearTasksHandler = useContext(TasksContext).clearTasks;

  const closeErrorModalHandler = () => {
    setIsError(false);
  };

  const finishedTasksList = finishedTasks.map((task) => {
    return (
      <TaskItem
        labelName="Repeat"
        key={task.name}
        name={task.name}
        checked={task.isDone}
        description={task.description}
        toggleDone={() => toggleDoneHandler(task)}
        deleteClick={() => deleteTaskHandler(task)}
      />
    );
  });

  let finishedTasksContent = (
    <div className={styles.taskWrapper}>
      <h1>Completed Tasks</h1>
      <div>{isLoading ? <Loader /> : <h3> You have no current tasks </h3>}</div>
    </div>
  );

  if (finishedTasksList.length > 0) {
    finishedTasksContent = (
      <div className={styles.taskWrapper}>
        <header>
          <h1>Completed Tasks</h1>
          <span></span>
          <ContextMenu maincontext>
            <div onClick={() => allRepeatHandler('finished')}>Repeat All</div>
            <div onClick={() => clearTasksHandler('finished')}>Clear All</div>
          </ContextMenu>
        </header>
        <div className={styles.loader}>{isLoading && <Loader />}</div>
        <ul> {finishedTasksList}</ul>
      </div>
    );
  }

  return (
    <div>
      <Modal show={isError} modalClosed={closeErrorModalHandler}>
        <h3 style={{ padding: '16px 0' }}>
          Ooops, something went wrong. Please come back and try again later
        </h3>
        <Button clicked={closeErrorModalHandler} btnType="btnDark">
          OK
        </Button>
      </Modal>
      {finishedTasksContent}
    </div>
  );
};

export default FinishedTask;
