import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Home from './pages/Home/index.jsx';
import List from './pages/List/ListPage.jsx';
import PostDetail from './pages/Post/PostDetail.jsx';
import Answer from './pages/Answer/index.jsx';
import Layout from './components/layout/Layout.jsx';
import ModalTest from './components/Modal/ModalTest.jsx';
import './index.css';

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
        path: '/ModalTest',
        element: <ModalTest />,
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
            Component: Answer,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
