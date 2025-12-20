import Logo from '../../assets/images/logo.png';
import Dropdown from '../../components/dropdown/Dropdown';
import Pagination from './pagination';
import styles from './ListPage.module.css';
import { useNavigate } from 'react-router';
import BoxButton from '../../components/Button/BoxButton';
import { useEffect, useMemo, useState } from 'react';
import { instance } from '../../services/instance';
import ListItem from './ListItems';

const LIMIT = 8;

function List() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('latest');

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await instance(`subjects/?limit=1000`, {
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

  const visibleList = useMemo(() => {
    const sorted = [...list].sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name, 'en', { numeric: true });
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const start = (page - 1) * LIMIT;
    return sorted.slice(start, start + LIMIT);
  }, [list, page, sortType]);

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
          setSortType(value);
          setPage(1);
        }}
      />
      <div className={styles.listContainer}>
        {visibleList.map(item => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default List;
