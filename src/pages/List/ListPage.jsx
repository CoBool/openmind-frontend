import Logo from '../../assets/images/logo.png'
import Dropdown from '../../components/dropdown/Dropdown'
import Fagination from './pagination'
import styles from './ListPage.module.css'
import { useNavigate } from 'react-router-dom'

function List() {
  const navigate = useNavigate()

  return (
    <div className={styles.listPage}>
      <header className={styles.listheader}>
        <img
          src={Logo}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate('/')}
        />
        <button type="button">답변하러 가기</button>
      </header>
      <h1 className={styles.listTitle}>누구에게 질문할까요?</h1>
      <Dropdown />
      <div>{/* 리스트 아이템들이 여기에 들어갑니다 */}</div>
      <Fagination />
    </div>
  )
}

export default List
