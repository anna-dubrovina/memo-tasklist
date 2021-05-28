import { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { TasksContext } from '../../store/task-context';
import * as vars from '../../utilities/global-vars';
import Button from '../UI/Button';
import ContextMenu from '../UI/ContextMenu';
import Loader from '../UI/Loader';
import styles from './TaskHeader.module.scss';

const TaskHeader = (props) => {
  const [pageMode, setPageMode] = useState('');
  const { isLoading, changeAll } = useContext(TasksContext);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      setPageMode(vars.CURRENT);
    } else {
      setPageMode(vars.FINISHED);
    }
  }, [pathname]);

  let taskHeaderContent;

  if (!props.hasTaskList) {
    taskHeaderContent = isLoading ? <Loader /> : <h3> You have no tasks </h3>;
  }

  if (props.hasTaskList) {
    taskHeaderContent = (
      <Fragment>
        <ContextMenu maincontext>
          <div onClick={() => changeAll(pageMode, vars.TOGGLE_ALL)}>
            {pageMode === vars.CURRENT ? 'Done All' : 'Repeat All'}
          </div>
          <div onClick={() => changeAll(pageMode, vars.CLEAR_ALL)}>
            Clear All
          </div>
        </ContextMenu>
        <div className={styles.loader}>{isLoading && <Loader />}</div>
      </Fragment>
    );
  }

  return (
    <header
      className={props.hasTaskList ? styles.taskHeader : styles.noTaskList}
    >
      <h1>{pageMode === vars.CURRENT ? 'Current Tasks' : 'Completed Tasks'}</h1>
      {pageMode === vars.CURRENT ? (
        <Button clicked={props.openAddModal}>New Task</Button>
      ) : <span />}
      {taskHeaderContent}
    </header>
  );
};

export default TaskHeader;
