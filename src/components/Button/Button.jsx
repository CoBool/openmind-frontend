import styles from './Button.module.css';

const buttonSizes = {
  sm: styles.sm,
  md: styles.md,
};
/**
 * 박스형 버튼 컴포넌트
 * @param {React.ReactNode} children - 버튼 안에 표시될 내용
 * @param {'sm' | 'md'} size - 버튼 크기 (기본: md)
 * @param {boolean} disabled - 버튼 비활성화 여부 (기본: false)
 * @param {string} className - 외부에서 추가할 스타일
 */
function Button({
  children,
  size = 'md',
  disabled = false,
  className = '',
  ...restProps
}) {
  const sizeClass = buttonSizes[size] ?? buttonSizes.md;

  const classNames = `${styles.button} ${sizeClass} ${className}`;

  return (
    // 클래스 적용: 기본 스타일 + 크기
    <button
      className={`${classNames}`}
      disabled={disabled} // 비활성화 상태 전달
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
