import { useContext } from 'react';
import { TasksContext } from '../../store/task-context';
import ContextMenu from '../UI/ContextMenu';
import deleteIcon from '../../assets/trash.png';
import pinnedIcon from '../../assets/paper-pin.png';
import deadlineIcon from '../../assets/deadline.png';
import styles from './TaskItem.module.scss';

const TaskItem = (props) => {
  const { toggleDone, togglePin, deleteTask } = useContext(TasksContext);

  let deadlineContent = (
    <span className={styles.deadline}>
      <img src={deadlineIcon} alt="deadline icon" />
      {new Date(props.deadline).toLocaleString().substring(0, 17)}
    </span>
  );

  let optionsContent = (
    <ContextMenu className={styles.optionsBtn}>
      <div onClick={() => togglePin(props.taskObj)}>
        {props.pinned ? 'Unpin' : 'Pin'}
      </div>
      <div onClick={props.editClick}>Edit</div>
      <div onClick={() => deleteTask(props.taskObj)}>Delete</div>
    </ContextMenu>
  );

  if (props.checked) {
    optionsContent = (
      <div onClick={() => deleteTask(props.taskObj)}>
        <img className={styles.deleteBtn} src={deleteIcon} alt="Delete" />
      </div>
    );
    deadlineContent = <span></span>;
  }

  return (
    <li className={styles.taskItem}>
      <div className={styles.taskTitle}>
        <h4>{props.name}</h4>
        {props.pinned && (
          <img
            src={pinnedIcon}
            className={styles.pinned}
            onClick={() => togglePin(props.taskObj)}
            alt="pinned"
          />
        )}
      </div>
      {deadlineContent}
      <label htmlFor="isDone">
        <input
          name="isDone"
          type="checkbox"
          checked={props.checked}
          onChange={() => toggleDone(props.taskObj)}
        />
        <span>Done</span>
      </label>
      {optionsContent}

      <p>{props.description}</p>
    </li>
  );
};

export default TaskItem;
