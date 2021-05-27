import { useCallback, useContext, useState } from 'react';
import { TasksContext } from '../store/task-context';
import TaskForm from '../components/Tasks/TaskForm';
import Modal from '../components/UI/Modal';
import TaskList from '../components/Tasks/TaskList';
import TaskHeader from '../components/Tasks/TaskHeader';

const CurrentTasks = () => {
  const currentTasks = useContext(TasksContext).tasks.filter((t) => !t.isDone);
  const [adding, setAdding] = useState(false);
  const [editingData, setEditingData] = useState({
    editingTask: {},
    editing: false,
  });

  const openAddModalHandler = useCallback(() => setAdding(true), []);

  const openEditModalHandler = (task) => {
    const updatedEditingData = {
      ...editingData,
      editingTask: task,
      editing: true,
    };
    setEditingData(updatedEditingData);
  };

  const closeModalHandler = () => {
    if (adding) {
      setAdding(false);
    }
    if (editingData.editing) {
      setEditingData({ ...editingData, editingTask: {}, editing: false });
    }
  };

  return (
    <div className="taskWrapper">
      <Modal
        show={adding || editingData.editing}
        modalClosed={closeModalHandler}
      >
        <TaskForm
          addingMode={adding}
          editingMode={editingData.editing}
          editingData={editingData.editingTask}
          closeModal={closeModalHandler}
        />
      </Modal>

      <TaskHeader
        hasTaskList={currentTasks.length > 0}
        openAddModal={openAddModalHandler}
      />

      {currentTasks.length > 0 && (
        <TaskList tasks={currentTasks} onEdit={openEditModalHandler} />
      )}
    </div>
  );
};

export default CurrentTasks;
