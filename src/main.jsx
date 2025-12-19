import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Home from './pages/Home/index.jsx';
import PostDetail from './pages/Post/PostDetail.jsx';
import Answer from './pages/Answer/index.jsx';

import './index.css';
import List from './pages/list/ListPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'list', // List 페이지 경로
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
