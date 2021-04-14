import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ContextMenu.module.scss';

const ContextMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = useRef(null);

  const toggleContextMenu = useCallback(() => {
    setIsOpen((curState) => !curState);
  }, []);

  const closeOptions = useCallback(
    (e) => {
      if (
        e.target === options.current ||
        e.target.parentElement === options.current
      ) {
        return;
      } else {
        toggleContextMenu();
      }
    },
    [toggleContextMenu]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('click', closeOptions);
    }
    return () => {
      document.body.removeEventListener('click', closeOptions);
    };
  }, [isOpen, closeOptions]);

  let attachedClasses = [styles.contextMenu, styles.close];
  if (props.maincontext) {
    attachedClasses = [styles.mainContextMenu, styles.close];
  }
  if (isOpen && props.maincontext) {
    attachedClasses = [styles.mainContextMenu, styles.open];
  } else if (isOpen && !props.maincontext) {
    attachedClasses = [styles.contextMenu, styles.open];
  }

  return (
    <div ref={options} style={{ position: 'relative' }}>
      <div className={props.maincontext ? styles.mainOptions : styles.options} onClick={toggleContextMenu}></div>
      <div className={attachedClasses.join(' ')}>{props.children}</div>
    </div>
  );
};

export default ContextMenu;
