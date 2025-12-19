import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import Home from './pages/Home/index.jsx'
import PostDetail from './pages/Post/PostDetail.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'post/:subjectId',
        Component: PostDetail,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
