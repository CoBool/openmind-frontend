import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './provider/AuthPrivder.jsx';
import { Toaster } from './components/Toast/Toaster.jsx';

import { AuthProvider } from './provider/AuthPrivder.jsx';

import Home from './pages/Home/index.jsx';
import List from './pages/List/ListPage.jsx';
import PostDetail from './pages/Post/PostDetail.jsx';
import PostAnswer from './pages/Post/PostAnswer.jsx';
import Layout from './components/layout/Layout.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, Component: Home },
      { path: 'list', Component: List },
      {
        path: '/ModalTest',
        element: <ModalTest />,
      },
      {
        path: 'post',
        children: [
          { path: ':subjectId', Component: PostDetail },
          { path: ':subjectId/answer', Component: PostAnswer },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
