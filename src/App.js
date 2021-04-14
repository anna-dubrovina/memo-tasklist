import { Route } from 'react-router';
import Layout from './Components/Layout/Layout';
import CurrentTasks from './Components/Tasks/CurrentTasks';
import FinishedTasks from './Components/Tasks/FinishedTasks';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={CurrentTasks} />
        <Route path="/finished" component={FinishedTasks} />
      </Layout>
    </div>
  );
};

export default App;
