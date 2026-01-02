import { useEffect } from 'react';

import { useToast } from './useToast.js';
import styles from './Toast.module.css';

function Toast({ toast, dismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dismiss]);

  return (
    <div
      className={styles.toast}
      style={{ '--duration': `${toast.duration || 3000}ms` }}
      data-state={toast.visible ? 'visible' : 'hidden'}
    >
      <div className={styles.content}>
        {toast.title && <h3 className={styles.title}>{toast.title}</h3>}
        {toast.description && (
          <p className={styles.description}>{toast.description}</p>
        )}
      </div>

      <button className={styles.closeBtn} onClick={() => dismiss(toast.id)}>X</button>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
    </div>
  );
}

function Toaster() {
  const { toasts, dismiss } = useToast();

  if(toasts.length === 0) return null;
  return (
    <div className={styles.toaster}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} dismiss={dismiss} />
      ))}
    </div>
  );
}

export { Toaster }