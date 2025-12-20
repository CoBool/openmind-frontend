import Logo from '../../assets/images/logo.png'
import Dropdown from '../../components/Dropdown/Dropdown'
import Pagination from './Pagination'
import styles from './ListPage.module.css'
import { useNavigate } from 'react-router-dom'
import BoxButton from '../../components/Button/BoxButton'
import { useEffect, useMemo, useState } from 'react'
import { instance } from '../../services/instance'
import ListItem from './ListItems'

// 한 페이지에 표시할 아이템 갯수
const LIMIT = 8

function List() {
  const navigate = useNavigate()

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  // 기본 정렬 타입 -> 최신순
  const [sortType, setSortType] = useState('latest')

  // 아이템 불러오기 함수
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        // 전체 아이템 요청 100개 한도
        // 추후 변동 가능
        const response = await instance(`subjects/?limit=100`, {
          method: 'GET',
        })

        const data = await response.json()
        setList(data.results)
      } catch (e) {
        console.error(e)
      }
    }

    fetchAllItems()
  }, [])

  // 현재 페이지에 표시할 아이템 계산 (정렬 + 페이징)
  const visibleList = useMemo(() => {
    const sorted = [...list].sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name, 'en', { numeric: true })
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    const start = (page - 1) * LIMIT
    return sorted.slice(start, start + LIMIT)
  }, [list, page, sortType])

  return (
    <div className={styles.listPage}>
      <header className={styles.listheader}>
        <img
          src={Logo}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate('/')}
        />
        <div className={styles.listButton}>
          <BoxButton color="beige" size="sizeMain" isArrow>
            답변하러 가기
          </BoxButton>
        </div>
      </header>
      <h1 className={styles.listTitle}>누구에게 질문할까요?</h1>
      <Dropdown
        value={sortType}
        onChange={value => {
          setSortType(value)
          setPage(1)
        }}
      />
      <div className={styles.listContainer}>
        {visibleList.map(item => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
      <Pagination totalCount={list.length} page={page} setPage={setPage} />
    </div>
  )
}

export default List

// 데이터 클릭시 개별피드 데이터로 이동
