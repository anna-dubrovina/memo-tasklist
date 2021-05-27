import { TasksContext } from '../../store/task-context';
import Button from './Button';
import Modal from './Modal';
import { useContext } from 'react';

const ErrorModal = () => {
  const { isError, setIsError } = useContext(TasksContext);
  const closeErrorModalHandler = () => setIsError(false);

  return (
    <Modal show={isError} modalClosed={closeErrorModalHandler}>
      <h3 style={{ padding: '16px 0' }}>
        Ooops, something went wrong. Please come back and try again later
      </h3>
      <Button clicked={closeErrorModalHandler} btnType="btnDark">
        OK
      </Button>
    </Modal>
  );
};

export default ErrorModal;
