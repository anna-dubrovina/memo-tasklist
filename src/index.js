import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { TasksProvider } from './Context/taskContext';
import App from './App';
import './styles/index.scss';



ReactDOM.render(
  <React.StrictMode>
    <TasksProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TasksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
