import ArrowLeft from '../../assets/Icon/Pagination-left.svg';
import ArrowRight from '../../assets/Icon/Pagination-right.svg';
import { getPagination } from '../../utils/pagination';
import styles from './Pagination.module.css';

// 한 그룹당 페이지 수
function Pagination({ totalCount, page, setPage, limit }) {
  const { totalPage, startPage, endPage, isFirstPage, isLastPage } =
    getPagination({
      totalCount,
      page,
      limit,
    });

  if (totalPage <= 1) return null;

  // 이전 페이지 이동
  const handlePrev = () => {
    if (isFirstPage) return;
    setPage(perv => perv - 1);
  };

  // 다음 페이지 이동
  const handleNext = () => {
    if (isLastPage) return;
    setPage(prev => prev + 1);
  };

  // 특정 페이지 이동
  const handleMove = targetPage => {
    if (targetPage === page) return;
    setPage(targetPage);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButtonLeft}
        onClick={handlePrev}
        disabled={isFirstPage}
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
        <img src={ArrowRight} alt="다음 페이지" />
      </button>
    </div>
  );
}

export default Pagination;
