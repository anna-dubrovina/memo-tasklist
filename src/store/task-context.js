import React, { useState, useEffect } from 'react';
import { URL_DB } from '../dblink';

export const TasksContext = React.createContext({
  tasks: [],
  isLoading: false,
  isError: false,
  setIsError: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  toggleDone: () => {},
  togglePin: () => {},
  toggleAllDone: () => {},
  clearTasks: () => {},
});

export const TasksProvider = (props) => {
  const [tasks, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const httpRequest = (url, method, body, updatedTasks, requestType) => {
    setIsLoading(true);
    fetch(url, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (requestType === 'GET_TASKS') {
          for (const key in resData) {
            updatedTasks.push({
              id: key,
              name: resData[key].name,
              description: resData[key].description,
              deadline: resData[key].deadline,
              isDone: resData[key].isDone,
              isPinned: resData[key].isPinned,
            });
          }
        } else if (requestType === 'ADD_TASK') {
          updatedTasks[updatedTasks.length - 1].id = resData.name;
        }
        setTaskList(updatedTasks);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const toggle = (selectedTask, toggledProperty) => {
    const taskIndex = tasks.findIndex((t) => t.id === selectedTask.id);
    const updatedTasks = [...tasks];
    const newStatus = !tasks[taskIndex][toggledProperty];
    updatedTasks[taskIndex] = {
      ...tasks[taskIndex],
      [toggledProperty]: newStatus,
    };
    return updatedTasks;
  };

  const changeAllTasks = (type) => {
    let updatedTasks;
    switch (type) {
      case 'current_toggleAll':
        updatedTasks = tasks.map((t) => {
          return { ...t, isDone: true };
        });
        break;
      case 'current_clearAll':
        updatedTasks = tasks.filter((t) => t.isDone);
        break;
      case 'finished_toggleAll':
        updatedTasks = tasks.map((t) => {
          return { ...t, isDone: false };
        });
        break;
      case 'finished_clearAll':
        updatedTasks = tasks.filter((t) => !t.isDone);
        break;
      default:
        return updatedTasks;
    }

    let firebaseObj = {};
    updatedTasks.forEach((task) => {
      firebaseObj[task.id] = { ...task };
    });

    return [updatedTasks, firebaseObj];
  };

  useEffect(() => {
    const updatedTasks = [];
    httpRequest(
      `${URL_DB}/tasks.json`,
      'GET',
      null,
      updatedTasks,
      'GET_TASKS'
    );
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks];
    updatedTasks.push(newTask);
    httpRequest(
      `${URL_DB}/tasks.json`,
      'POST',
      JSON.stringify(newTask),
      updatedTasks,
      'ADD_TASK'
    );
  };

  const editTask = (selectedTask, editedTask) => {
    const taskIndex = tasks.findIndex((t) => t.id === selectedTask.id);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...tasks[taskIndex],
      name: editedTask.name,
      description: editedTask.description,
      deadline: editedTask.deadline,
    };

    httpRequest(
      `${URL_DB}/tasks/${selectedTask.id}.json`,
      'PUT',
      JSON.stringify(updatedTasks[taskIndex]),
      updatedTasks
    );
  };

  const deleteTask = (selectedTask) => {
    const updatedTasks = tasks.filter((t) => t.id !== selectedTask.id);
    httpRequest(
      `${URL_DB}/tasks/${selectedTask.id}.json`,
      'DELETE',
      null,
      updatedTasks
    );
  };

  const toggleDone = (selectedTask) => {
    const updatedTasks = toggle(selectedTask, 'isDone');
    httpRequest(
      `${URL_DB}/tasks/${selectedTask.id}.json`,
      'PUT',
      JSON.stringify({ ...selectedTask, isDone: !selectedTask.isDone }),
      updatedTasks
    );
  };

  const togglePin = (selectedTask) => {
    const updatedTasks = toggle(selectedTask, 'isPinned');
    httpRequest(
      `${URL_DB}/tasks/${selectedTask.id}.json`,
      'PUT',
      JSON.stringify({ ...selectedTask, isPinned: !selectedTask.isPinned }),
      updatedTasks
    );
  };


  const toggleAllDone = (listType) => {
    const [updatedTasks, firebaseObj] = changeAllTasks(listType + '_toggleAll');
    httpRequest(
      `${URL_DB}/tasks.json`,
      'PUT',
      JSON.stringify(firebaseObj),
      updatedTasks
    );
  };

  const clearTasks = (listType) => {
    const [updatedTasks, firebaseObj] = changeAllTasks(listType + '_clearAll');
    httpRequest(
      `${URL_DB}/tasks.json`,
      'PUT',
      JSON.stringify(firebaseObj),
      updatedTasks
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
    toggleDone,
    togglePin,
    clearTasks,
    toggleAllDone
  };

  return (
    <TasksContext.Provider
      value={context}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
