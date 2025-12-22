import ArrowLeft from '../../assets/Icon/Pagination-left.svg';
import ArrowRight from '../../assets/Icon/Pagination-right.svg';
import styles from './Pagination.module.css';

// 한 그룹당 페이지 수
const SIZE_PER_PAGE_GROUP = 5;

function Pagination({ totalCount, page, setPage, limit }) {
  const totalPage = Math.ceil(totalCount / limit);
  if (totalPage <= 1) return null;

  // 현재 페이지 그룹 계산
  const groupedPages = Math.floor((page - 1) / SIZE_PER_PAGE_GROUP);
  const startPage = groupedPages * SIZE_PER_PAGE_GROUP + 1;
  const endPage = Math.min(startPage + SIZE_PER_PAGE_GROUP - 1, totalPage);

  // 페이지 이동 함수
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPage));

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButtonLeft}
        onClick={handlePrev}
        disabled={page === 1}
      >
        <img src={ArrowLeft} alt="이전 페이지" />
      </button>

      {/* 페이지 번호 버튼들 */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map(p => (
        <button
          key={p}
          className={`${styles.pageButton} ${p === page ? styles.active : ''}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.pageButtonRight}
        onClick={handleNext}
        disabled={page === totalPage}
      >
        <img src={ArrowRight} alt="다음 페이지" />
      </button>
    </div>
  );
}

export default Pagination;
