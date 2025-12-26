import { createContext, useContext, useState } from 'react';
import styles from './ToastCopy.module.css';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <div className={`font-body2 ${styles.ToastText}`}>{toast}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
