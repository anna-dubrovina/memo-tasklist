import TaskItem from './TaskItem';

const TaskList = (props) => {
  const sortedTasksList = props.tasks.sort((firstEl, secondEl) => {
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

  const tasksList = sortedTasksList.map((task) => {
    return (
      <TaskItem
        taskObj={task}
        key={task.id}
        name={task.name}
        description={task.description}
        deadline={task.deadline}
        checked={task.isDone}
        pinned={task.isPinned}
        editClick={() => props.onEdit(task)}
      />
    );
  });

  return <ul>{tasksList}</ul>;
};

export default TaskList;
