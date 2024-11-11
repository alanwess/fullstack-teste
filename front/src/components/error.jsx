import { useEffect } from 'react';
import '../styles/toast.css'

const Toast = ({ message, onSetHideToast, duration = 3000 }) => {
  const handleClose = () => {
    onSetHideToast(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="toast">
      <span style={{ marginRight: 10 }}>{message}</span>
      <button onClick={handleClose} className="closeButton">
        &times;
      </button>
    </div>
  );
};

export default Toast;
