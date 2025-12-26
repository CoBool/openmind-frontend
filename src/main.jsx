import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Home from './pages/Home/index.jsx';
import List from './pages/List/ListPage.jsx';
import PostDetail from './pages/Post/PostDetail.jsx';
import PostAnswer from './pages/Post/PostAnswer.jsx';
import Layout from './components/layout/Layout.jsx';

import './index.css';
import { ToastProvider } from './contexts/Toast/ToastCopy.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'list',
        Component: List,
      },
      {
        path: 'post',
        children: [
          {
            path: ':subjectId',
            Component: PostDetail,
          },
          {
            path: ':subjectId/answer',
            Component: PostAnswer,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>
);
