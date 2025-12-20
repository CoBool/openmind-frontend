import { useEffect, useState } from 'react'
import ArrowLeft from '../../assets/Icon/pagination-left.svg'
import ArrowRight from '../../assets/Icon/pagination-right.svg'
import styles from './Pagination.module.css'

// 한 그룹당 페이지 수
const SIZE_PER_PAGE_GROUP = 5

function Pagination({ totalCount, page, setPage }) {
  const getPageSize = () => {
    // 반응형 대비 페이지 수
    if (typeof window === 'undefined') return 4
    const width = window.innerWidth
    if (width >= 1200) return 8
    if (width >= 768) return 6
    return 4
  }

  const [pageSize, setPageSize] = useState(getPageSize())

  // 화면 크기 변경에 따른 페이지 수 업데이트
  // 반응형 대응
  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 페이지 크기 변경 시 현재 페이지 초기화
  useEffect(() => {
    if (page !== 1) {
      const timer = setTimeout(() => setPage(1), 0)
      return () => clearTimeout(timer)
    }
  }, [pageSize])

  // 총 페이지 수 계산
  const totalPage = Math.ceil(totalCount / pageSize)
  if (totalPage <= 1) return null

  // 현재 페이지 그룹 계산
  const groupedPages = Math.floor((page - 1) / SIZE_PER_PAGE_GROUP)
  const startPage = groupedPages * SIZE_PER_PAGE_GROUP + 1
  const endPage = Math.min(startPage + SIZE_PER_PAGE_GROUP - 1, totalPage)

  // 페이지 이동 함수
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1))
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPage))

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
  )
}

export default Pagination
