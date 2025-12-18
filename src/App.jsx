import List from './pages/List/ListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/post/:id/answer" element={<>Answer Page</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
