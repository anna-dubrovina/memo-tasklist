import { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { TasksContext } from '../../store/task-context';
import Button from '../UI/Button';
import ContextMenu from '../UI/ContextMenu';
import Loader from '../UI/Loader';
import styles from './TaskHeader.module.scss';

const CURRENT = 'current';
const FINISHED = 'finished';

const TaskHeader = (props) => {
  const [pageMode, setPageMode] = useState('');
  const { isLoading, toggleAllDone, clearTasks } = useContext(TasksContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      setPageMode(CURRENT);
    } else {
      setPageMode(FINISHED);
    }
  }, [pathname]);


  let taskHeaderContent;

  if (pageMode === CURRENT && !props.hasTaskList) {
    taskHeaderContent = (
      <Fragment>
        <Button clicked={props.openAddModal}>New Task</Button>
        {isLoading ? <Loader /> : <h3> You have no current tasks </h3>}
      </Fragment>
    );
  }

  if (pageMode === CURRENT && props.hasTaskList) {
    taskHeaderContent = (
      <Fragment>
        <Button clicked={props.openAddModal}> New Task</Button>
        <ContextMenu maincontext>
          <div onClick={() => toggleAllDone(CURRENT)}>Done All</div>
          <div onClick={() => clearTasks(CURRENT)}>Clear All</div>
        </ContextMenu>
        <div className={styles.loader}>{isLoading && <Loader />}</div>
      </Fragment>
    );
  }

  if (pageMode === FINISHED && !props.hasTaskList) {
    taskHeaderContent = isLoading ? (
      <Loader />
    ) : (
      <h3> You have no finished tasks </h3>
    );
  }

  if (pageMode === FINISHED && props.hasTaskList) {
    taskHeaderContent = (
      <Fragment>
        <span></span>
        <ContextMenu maincontext>
          <div onClick={() => toggleAllDone(FINISHED)}>Repeat All</div>
          <div onClick={() => clearTasks(FINISHED)}>Clear All</div>
        </ContextMenu>
        <div className={styles.loader}>{isLoading && <Loader />}</div>
      </Fragment>
    );
  }

  return (
    <header className={props.hasTaskList ? styles.taskHeader : styles.noTaskList}>
      <h1>{pageMode === CURRENT ? 'Current Tasks' : 'CompletedTasks'}</h1>
      {taskHeaderContent}
    </header>
  );
};

export default TaskHeader;
