import { useContext } from 'react';
import { TasksContext } from '../store/task-context';
import TaskList from '../components/Tasks/TaskList';
import TaskHeader from '../components/Tasks/TaskHeader';

const FinishedTask = () => {
  const finishedTasks = useContext(TasksContext).tasks.filter((t) => t.isDone);

  return (
    <div className="taskWrapper">
      <TaskHeader hasTaskList={finishedTasks.length > 0} />
      {finishedTasks.length > 0 && <TaskList tasks={finishedTasks} />}
    </div>
  );
};

export default FinishedTask;
