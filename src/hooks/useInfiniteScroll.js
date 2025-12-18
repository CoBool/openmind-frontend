import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * 무한 스크롤을 위한 훅
 * @param {function} callback - 더 데이터를 가져오는 함수
 * @returns {object} - ref와 isFetching 상태
 * @returns {React.RefObject} ref - 무한 스크롤을 위한 참조
 * @returns {boolean} isFetching - 데이터를 가져오는 중인지 여부
 */
export function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false)
  const ref = useRef(null)

  /**
   * 관찰자 핸들러
   *
   * @param {IntersectionObserverEntry[]} entries - 관찰자 핸들러
   * @returns {void}
   */
  const handleObserver = useCallback(
    async entries => {
      const target = entries[0]

      if (target.isIntersecting && !isFetching) {
        setIsFetching(true)

        try {
          await callback()
        } catch {
          console.error('Error fetching more data')
        } finally {
          setIsFetching(false)
        }
      }
    },
    [callback, isFetching]
  )

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [handleObserver])

  return { ref, isFetching }
}
