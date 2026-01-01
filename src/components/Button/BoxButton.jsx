import styles from './BoxButton.module.css';
import { Icon } from '@/components/Icon';

const buttonVariants = {
  // 색상종류
  variant: {
    brown: styles.brown,
    beige: styles.beige,
  },
  // 크기 종류
  size: {
    sm: styles.sm,
    md: styles.md,
    mdFixed: styles.mdFixed,
  },
};
/**
 * 박스형 버튼 컴포넌트
 * @param {React.ReactNode} children - 버튼 안에 표시될 내용 (텍스트 등)
 * @param {'brown' | 'beige'} variant - 버튼 색상 (기본: brown)
 * @param {'sm' | 'md'} size - 버튼 크기 (기본: md)
 * @param {boolean} disabled - 버튼 비활성화 여부 (기본: false)
 * @param {string} className - 외부에서 추가할 스타일
 * @param {boolean} isArrow - 화살표 아이콘 표시 여부 (기본: false)
 */
function BoxButton({
  children,
  variant = 'brown',
  size = 'md',
  disabled = false,
  className = '',
  isArrow = false,
  ...restProps
}) {
  const variantClass =
    buttonVariants.variant[variant] ?? buttonVariants.variant.brown;

  const sizeClass = buttonVariants.size[size] ?? buttonVariants.size.md;

  const ClassNames = `${styles.button} ${variantClass} ${sizeClass} ${className}`;

  return (
    // 클래스 3개 적용: 공통 + 색상 + 크기
    <button
      className={`${ClassNames}`}
      disabled={disabled} // 비활성화 상태 전달
      {...restProps}
    >
      {children}
      {isArrow && (
        <Icon name="arrowRight" className={styles.icon} />
      )}
    </button>
  );
}

export default BoxButton;
