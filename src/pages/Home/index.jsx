import { Link } from 'react-router'
import MainPage from './MainPage'

export default function Home() {
  return (
    <div>
      <Link to="/list">List</Link>
      <MainPage />
    </div>
  )
}
