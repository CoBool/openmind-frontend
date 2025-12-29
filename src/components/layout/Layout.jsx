import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { ToastProvider } from '@/contexts/Toast/Toast.jsx';

export default function Layout() {
  return (
    <ToastProvider>
      <div className={styles.page}>
        <Outlet />
      </div>
    </ToastProvider>
  );
}
