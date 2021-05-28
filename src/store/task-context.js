import React, { useState, useEffect } from 'react';
import { URL_DB } from '../dblink';
import useHttp from '../hooks/use-http';
import * as vars from '../utilities/global-vars';

export const TasksContext = React.createContext({
  tasks: [],
  isLoading: false,
  isError: false,
  setIsError: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  toggleTask: () => {},
  changeAll: () => {},
});

export const TasksProvider = (props) => {
  const [tasks, setTaskList] = useState([]);
  const { isLoading, isError, setIsError, sendRequest } = useHttp();

  const getTasksRequest = (resData) => {
    const updatedTasks = [];
    for (const key in resData) {
      updatedTasks.push({
        id: key,
        name: resData[key].name,
        description: resData[key].description,
        deadline: resData[key].deadline,
        isDone: resData[key].isDone,
        isPinned: resData[key].isPinned,
      });
      setTaskList(updatedTasks);
    }
  };

  const addTaskRequest = (newTask, resData) => {
    newTask.id = resData.name;
    setTaskList((prevTasks) => prevTasks.concat(newTask));
  };

  const deleteTaskRequest = (selectedTask) => {
    setTaskList((prevTasks) =>
      prevTasks.filter((t) => t.id !== selectedTask.id)
    );
  };

  const editTaskRequest = (selectedTask, editedTask) => {
    const taskIndex = tasks.findIndex((t) => t.id === selectedTask.id);
    setTaskList((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = {
        ...tasks[taskIndex],
        name: editedTask.name,
        description: editedTask.description,
        deadline: editedTask.deadline,
      };
      return updatedTasks;
    });
  };

  const toggleTaskRequest = (selectedTask, toggledProperty) => {
    const taskIndex = tasks.findIndex((t) => t.id === selectedTask.id);
    setTaskList((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const newStatus = !prevTasks[taskIndex][toggledProperty];
      updatedTasks[taskIndex] = {
        ...tasks[taskIndex],
        [toggledProperty]: newStatus,
      };
      return updatedTasks;
    });
  };

  const changeAllRequest = (page, action) => {
    let updatedTasks;
    setTaskList((prevTasks) => {
      if (page === vars.CURRENT && action === vars.TOGGLE_ALL) {
        updatedTasks = prevTasks.map((t) => {
          return { ...t, isDone: true };
        });
      }
      if (page === vars.CURRENT && action === vars.CLEAR_ALL) {
        updatedTasks = prevTasks.filter((t) => t.isDone);
      }
      if (page === vars.FINISHED && action === vars.TOGGLE_ALL) {
        updatedTasks = prevTasks.map((t) => {
          return { ...t, isDone: false };
        });
      }
      if (page === vars.FINISHED && action === vars.CLEAR_ALL) {
        updatedTasks = prevTasks.filter((t) => !t.isDone);
      }
      return updatedTasks;
    });

    let firebaseObj = {};
    updatedTasks.forEach((task) => {
      firebaseObj[task.id] = { ...task };
    });

    return firebaseObj;
  };

  useEffect(() => {
    sendRequest({ url: `${URL_DB}/tasks.json` }, getTasksRequest);
  }, [sendRequest]);

  const addTask = (newTask) => {
    sendRequest(
      { url: `${URL_DB}/tasks.json`, method: 'POST', body: newTask },
      addTaskRequest.bind(null, newTask)
    );
  };

  const editTask = (selectedTask, editedTask) => {
    sendRequest(
      {
        url: `${URL_DB}/tasks/${selectedTask.id}.json`,
        method: 'PUT',
        body: editedTask,
      },
      editTaskRequest.bind(null, selectedTask, editedTask)
    );
  };

  const deleteTask = (selectedTask) => {
    sendRequest(
      {
        url: `${URL_DB}/tasks/${selectedTask.id}.json`,
        method: 'DELETE',
      },
      deleteTaskRequest.bind(null, selectedTask)
    );
  };

  const toggleTask = (selectedTask, toggledProperty) => {
    sendRequest(
      {
        url: `${URL_DB}/tasks/${selectedTask.id}.json`,
        method: 'PUT',
        body: { ...selectedTask, isDone: !selectedTask.isDone },
      },
      toggleTaskRequest.bind(null, selectedTask, toggledProperty)
    );
  };

  const changeAll = (pageType, actionType) => {
    const firebaseObj = changeAllRequest(pageType, actionType);
    sendRequest(
      {
        url: `${URL_DB}/tasks.json`,
        method: 'PUT',
        body: firebaseObj,
      },
      () => {}
    );
  };

  const context = {
    tasks,
    isLoading,
    isError,
    setIsError,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    changeAll,
  };

  return (
    <TasksContext.Provider value={context}>
      {props.children}
    </TasksContext.Provider>
  );
};
