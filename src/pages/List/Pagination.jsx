import { useEffect, useState } from 'react'
import ArrowLeft from '../../assets/Icon/pagination-left.svg'
import ArrowRight from '../../assets/Icon/pagination-right.svg'
import styles from './Pagination.module.css'

const SIZE_PER_PAGE = 5

function Pagination({ totalCount, page, setPage }) {
  const getPageSize = () => {
    if (typeof window === 'undefined') return 4
    const width = window.innerWidth
    if (width >= 1200) return 8
    if (width >= 768) return 6
    return 4
  }

  const [pageSize, setPageSize] = useState(getPageSize())

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (page !== 1) {
      const timer = setTimeout(() => setPage(1), 0)
      return () => clearTimeout(timer)
    }
  }, [pageSize])

  const totalPage = Math.ceil(totalCount / pageSize)
  if (totalPage <= 1) return null

  const groupedPages = Math.floor((page - 1) / SIZE_PER_PAGE)
  const startPage = groupedPages * SIZE_PER_PAGE + 1
  const endPage = Math.min(startPage + SIZE_PER_PAGE - 1, totalPage)

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
