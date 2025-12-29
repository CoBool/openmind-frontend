import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { ToastProvider } from '@/contexts/Toast/Toast.jsx';

export default function Layout() {
  return (
    <ToastProvider>
      <div className={styles.page}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
    </ToastProvider>
  );
}
