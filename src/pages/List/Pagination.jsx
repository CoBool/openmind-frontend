import { getPagination } from './hooks/pagination';
import styles from './Pagination.module.css';
import { Icon } from '@/components/Icon';

// 한 그룹당 페이지 수
function Pagination({ totalCount, page, setPage, limit }) {
  const { totalPage, startPage, endPage, isFirstPage, isLastPage } =
    getPagination({
      totalCount,
      page,
      limit,
    });

  if (totalPage === 0) return null;

  // 이전 페이지 이동
  const handlePrev = () => {
    if (isFirstPage) return;
    setPage(prev => prev - 1);
  };

  // 다음 페이지 이동
  const handleNext = () => {
    if (isLastPage) return;
    setPage(prev => prev + 1);
  };

  // 첫 페이지 이동
  const handleFirst = () => {
    if (isFirstPage) return;
    setPage(1);
  };

  // 마지막 페이지 이동
  const handleLast = () => {
    if (isLastPage) return;
    setPage(totalPage);
  };

  // 특정 페이지 이동
  const handleMove = targetPage => {
    if (targetPage === page) return;
    setPage(targetPage);
  };

  // 페이지 번호 버튼
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageButtonLeft} ${styles.edgeButton}`}
        onClick={handleFirst}
        disabled={isFirstPage}
      >
        <span className={styles.doubleArrow}>
          <Icon name="paginationFirst" />
        </span>
      </button>

      <button
        className={styles.pageButtonLeft}
        onClick={handlePrev}
        disabled={isFirstPage}
      >
        <Icon name="paginationPrev" />
      </button>

      {pages.map(p => (
        <button
          key={p}
          className={`${styles.pageButton} ${p === page ? styles.active : ''}`}
          onClick={() => handleMove(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.pageButtonRight}
        onClick={handleNext}
        disabled={isLastPage}
      >
        <Icon name="paginationNext" />
      </button>

      <button
        className={`${styles.pageButtonRight} ${styles.edgeButton}`}
        onClick={handleLast}
        disabled={isLastPage}
      >
        <span className={styles.doubleArrow}>
          <Icon name="paginationLast" />
        </span>
      </button>
    </div>
  );
}

export default Pagination;
