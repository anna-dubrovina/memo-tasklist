import ContextMenu from '../UI/ContextMenu';
import deleteIcon from '../../assets/trash.png';
import pinnedIcon from '../../assets/paper-pin.png';
import deadlineIcon from '../../assets/deadline.png';
import styles from './TaskItem.module.scss';

const TaskItem = (props) => {
  let deadlineContent = (
    <span className={styles.deadline}>
      <img src={deadlineIcon} alt="deadline icon" />
      {new Date(props.deadline).toLocaleString().substring(0, 17)}
    </span>
  );

  let optionsContent = (
    <ContextMenu className={styles.optionsBtn}>
      <div onClick={props.pinnedClick}> {props.pinned ? 'Unpin' : 'Pin'}</div>
      <div onClick={props.editClick}>Edit</div>
      <div onClick={props.deleteClick}>Delete</div>
    </ContextMenu>
  );
  
  if (props.checked) {
    optionsContent = (
      <div onClick={props.deleteClick}>
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
            onClick={props.pinnedClick}
            alt="pinned"
          />
        )}
      </div>
      {deadlineContent}
      <label>
        <input
          name="isDone"
          type="checkbox"
          checked={props.checked}
          onChange={props.toggleDone}
        />
        <span>{props.labelName}</span>
      </label>
      {optionsContent}

      <p>{props.description}</p>
    </li>
  );
};

export default TaskItem;
