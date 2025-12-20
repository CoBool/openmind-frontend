import styles from './FloatingButton.module.css'

const sizeVariants = {
  sm: styles.sm,
  md: styles.md,
}
/**
 * 플로팅 버튼 컴포넌트
 * 화면에 떠있는 둥근 버튼 (질문 작성, 삭제 등)
 *
 * @param {React.ReactNode} children - 버튼 안에 표시될 내용
 * @param {'sm' | 'md'} size - 버튼 크기 (기본: md)
 * @param {string} className - 외부에서 추가할 스타일
 */

function FloatingButton({
  children,
  size = 'md',
  className = '',
  ...restProps
}) {
  // 크기 클래스 가져오기
  const sizeClass = sizeVariants[size] ?? sizeVariants.md

  // 최종 클래스명 조합
  // 기본 스타일 + 크기 + 외부 스타일
  const classNames = `${styles.button} ${sizeClass} ${className}`

  return (
    <button className={classNames} {...restProps}>
      {children}
    </button>
  )
}

export default FloatingButton
