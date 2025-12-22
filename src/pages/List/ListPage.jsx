import Logo from '../../assets/images/logo.png';
import Dropdown from '../../components/Dropdown/Dropdown';
import Pagination from './Pagination';
import styles from './ListPage.module.css';
import { useNavigate } from 'react-router-dom';
import BoxButton from '../../components/Button/BoxButton';
import { useEffect, useMemo, useState } from 'react';
import { instance } from '../../services/instance';
import ListItem from './ListItems';

function List() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(getLimitWidth());

  // 기본 정렬 타입 -> 최신순
  const [sortType, setSortType] = useState('latest');

  // 반응형 변경에 따른 데이터 갯수
  function getLimitWidth() {
    if (typeof window === 'undefined') return 8;
    const width = window.innerWidth;
    if (width >= 885) return 8;
    if (width >= 768) return 6;
    return 6;
  }

  // 창 크기 변경시 limit 재설정
  useEffect(() => {
    const handleResize = () => {
      const newlimit = getLimitWidth();
      setLimit(prev => (prev === newlimit ? prev : newlimit));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 아이템 불러오기 함수
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        // 전체 아이템 요청 100개 한도
        // 추후 변동 가능
        const response = await instance(`subjects/?limit=100`, {
          method: 'GET',
        });

        const data = await response.json();
        setList(data.results);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAllItems();
  }, []);

  const totalPage = Math.ceil(list.length / limit);

  // page 계산
  const safePage = Math.min(page, totalPage || 1);

  // 현재 페이지에 표시할 아이템 계산 (정렬 + 페이징)
  const visibleList = useMemo(() => {
    const sorted = [...list].sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name, 'en', { numeric: true });
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // 페이징 처리
    const start = (safePage - 1) * limit;
    // 잘라서 반환
    return sorted.slice(start, start + limit);
  }, [list, safePage, sortType, limit]);

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
      <div className={styles.titleArea}>
        <h1 className={styles.listTitle}>누구에게 질문할까요?</h1>
        <Dropdown
          value={sortType}
          onChange={value => {
            setSortType(value);
            setPage(1);
          }}
        />
      </div>
      <div className={styles.listContainer}>
        {visibleList.map(item => (
          <ListItem key={item.id} item={item} className={styles.card} />
        ))}
      </div>
      <Pagination
        totalCount={list.length}
        page={safePage}
        setPage={setPage}
        limit={limit}
      />
    </div>
  );
}

export default List;

// 데이터 클릭시 개별피드 데이터로 이동
