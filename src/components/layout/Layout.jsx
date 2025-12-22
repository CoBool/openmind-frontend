import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}
