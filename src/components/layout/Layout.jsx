import { Outlet } from 'react-router-dom';
import { ToastProvider } from '@/contexts/Toast/Toast.jsx';

export default function Layout() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}
