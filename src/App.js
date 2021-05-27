import React, { Suspense } from 'react';
import { Route } from 'react-router';

import Layout from './components/Layout/Layout';
import CurrentTasks from './pages/CurrentTasks';
import Loader from './components/UI/Loader';
import ErrorModal from './components/UI/ErrorModal';

const finishedTasksPage = React.lazy(() => import('./pages/FinishedTasks'));

const App = () => {
  return (
    <Layout>
      <ErrorModal />
      <Suspense fallback={<Loader />}>
        <Route path="/" exact component={CurrentTasks} />
        <Route path="/finished" component={finishedTasksPage} />
      </Suspense>
    </Layout>
  );
};

export default App;
