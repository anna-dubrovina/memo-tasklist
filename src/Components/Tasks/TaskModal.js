import { useState } from 'react';
import Button from '../UI/Button';
import styles from './TaskModal.module.scss';

const tzoffset = new Date().getTimezoneOffset() * 60000;
const currentDate = new Date(Date.now() - tzoffset)
  .toISOString()
  .substring(0, 16);

const TaskModal = (props) => {
  const initialTaskForm = {
    title: '',
    description: '',
    deadline: currentDate,
  };
  const [taskForm, setTaskForm] = useState(initialTaskForm);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const setInputValues = () => {
    if (
      taskForm.title === props.inputValues.name ||
      taskForm.description === props.inputValues.description ||
      isTouched
    ) {
      return;
    }
    const updatedTaskForm = {
      ...taskForm,
      title: props.inputValues.name,
      description: props.inputValues.description,
      deadline: props.inputValues.deadline,
    };
    setTaskForm(updatedTaskForm);
  };

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
    if (props.addingMode) {
      props.addTask(newTask);
    } else if (props.editingMode) {
      props.editTask(props.inputValues, newTask);
    }
    props.closeModal();
  };
  

  if (props.editingMode) {
    setInputValues();
  }
  if (
    !props.addingMode &&
    !props.editingMode &&
    (taskForm.title !== initialTaskForm.title ||
      taskForm.description !== initialTaskForm.description)
  ) {
    setTaskForm(initialTaskForm);
  }
  if (!props.addingMode && !props.editingMode && !isValid) {
    setIsValid(true);
  }
  if (!props.editingMode && isTouched) {
    setIsTouched(false);
  }

  return (
    <div className={styles.taskModal}>
      <div onClick={props.closeModal}>
        <div></div>
      </div>
      <h2>{props.addingMode ? 'Add New Task' : 'Edit Task'}</h2>

      <form
        onSubmit={formSubmitHandler}
        className={!isValid ? styles.invalid : null}
      >
        <p>
          {!isValid && 'Invalid Input. Please enter the title of your task.'}
        </p>

        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) => inputChangedHandler(e, 'title')}
          value={taskForm.title}
        />
        <input
          type="datetime-local"
          placeholder="Deadline"
          onChange={(e) => inputChangedHandler(e, 'deadline')}
          value={taskForm.deadline}
        />
        <textarea
          type="text"
          placeholder="Task Description"
          onChange={(e) => inputChangedHandler(e, 'description')}
          value={taskForm.description}
        />

        <Button>{props.addingMode ? 'Add new task' : 'Confirm Changes'}</Button>
      </form>
    </div>
  );
};

export default TaskModal;
