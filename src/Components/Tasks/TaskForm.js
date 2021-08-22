import { useCallback, useContext, useEffect, useState } from 'react';
import { TasksContext } from '../../store/task-context';
import Button from '../UI/Button';
import styles from './TaskForm.module.scss';

const tzoffset = new Date().getTimezoneOffset() * 60000;
const currentDate = new Date(Date.now() - tzoffset)
  .toISOString()
  .substring(0, 16);

const INITIALFORMSTATE = {
  title: '',
  description: '',
  deadline: currentDate,
};

const TaskForm = (props) => {
  const [taskForm, setTaskForm] = useState(INITIALFORMSTATE);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const { addingMode, editingMode, editingData } = props;
  const { addTask, editTask } = useContext(TasksContext);

  const setInputValues = useCallback(() => {
    if (
      taskForm.title === editingData.name ||
      taskForm.description === editingData.description ||
      isTouched
    ) {
      return;
    }

    setTaskForm((curTaskForm) => {
      const updatedTaskForm = {
        ...curTaskForm,
        title: editingData.name,
        description: editingData.description,
        deadline: editingData.deadline,
      };
      return updatedTaskForm;
    });
  }, [taskForm, editingData, isTouched]);

  const inputChangedHandler = (e, inputName) => {
    setIsTouched(true);
    setTaskForm((curTaskForm) => {
      const updatedTaskForm = { ...curTaskForm, [inputName]: e.target.value };
      return updatedTaskForm;
    });
    if (taskForm.title.length > 1) {
      setIsValid(true);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (taskForm.title.trim() === '') {
      setIsValid(false);
      return;
    }
    const newTask = {
      name: taskForm.title,
      description: taskForm.description,
      deadline: taskForm.deadline,
    };
    if (addingMode) {
      addTask(newTask);
    } else if (editingMode) {
      editTask(editingData, newTask);
    }
    props.closeModal();
  };

  useEffect(() => {
    if (editingMode) {
      setInputValues();
    }
    if (
      !addingMode &&
      !editingMode &&
      (taskForm.title !== '' || taskForm.description !== '')
    ) {
      setTaskForm(INITIALFORMSTATE);
    }
    if (!addingMode && !editingMode && !isValid) {
      setIsValid(true);
    }
    if (!editingMode && isTouched) {
      setIsTouched(false);
    }
  }, [isTouched, isValid, addingMode, editingMode, taskForm, setInputValues]);

  return (
    <div className={styles.taskForm}>
      <div className={styles.formHeader}>
        <div onClick={props.closeModal}>
          <div></div>
        </div>
        <h2>{addingMode ? 'Add New Task' : 'Edit Task'}</h2>
      </div>

      <form
        onSubmit={formSubmitHandler}
        className={!isValid ? styles.invalid : null}
      >
        <p>
          {!isValid && 'Invalid Input. Please enter the title of your task.'}
        </p>

        <input
          id="task-title"
          type="text"
          placeholder="Task Title"
          onChange={(e) => inputChangedHandler(e, 'title')}
          value={taskForm.title}
        />
        <div className={styles.deadlineInput}>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="datetime-local"
            id="deadline"
            onChange={(e) => inputChangedHandler(e, 'deadline')}
            value={taskForm.deadline}
          />
        </div>
        <textarea
          type="text"
          id="task-description"
          placeholder="Task Description"
          onChange={(e) => inputChangedHandler(e, 'description')}
          value={taskForm.description}
        />

        <Button submit={true}>
          {addingMode ? 'Add new task' : 'Confirm Changes'}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
