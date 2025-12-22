import styles from './Button.module.css';
import arrowBrown from '../../assets/Icon/arrowRightBrown.svg';

const buttonVariants = {
  type: {
    box: styles.box,
    floating: styles.floating,
  },
  variant: {
    brown: styles.brown,
    beige: styles.beige,
  },

  size: {
    sm: styles.sm,
    md: styles.md,
  },
};

/**
 * 공통 버튼 컴포넌트
 *
 * @param {React.ReactNode} children - 버튼 안에 표시될 내용
 * @param {'box' | 'floating'} type - 버튼 타입 (기본: 'box')
 * @param {'brown' | 'beige'} variant - 버튼 색상 (기본: 'brown', box 타입만)
 * @param {'sm' | 'md'} size - 버튼 크기 (기본: 'md')
 * @param {boolean} disabled - 비활성화 여부 (기본: false)
 * @param {boolean} isArrow - 화살표 아이콘 표시 (기본: false, box 타입만)
 * @param {string} className - 외부에서 추가할 스타일 (width 제어 등)
 * @param {object} restProps - 나머지 props (onClick, onMouseEnter 등)
 *
 */
function Button({
  children,
  type = 'box',
  variant = 'brown',
  size = 'md',
  disabled = false,
  isArrow = false,
  className = '',
  ...restProps
}) {
  const typeClass = buttonVariants.type[type] ?? buttonVariants.type.box;
  // 색상 클래스 선택
  const variantClass =
    type === 'box'
      ? (buttonVariants.variant[variant] ?? buttonVariants.variant.brown)
      : '';

  const sizeClass = buttonVariants.size[size] ?? buttonVariants.size.md;

  const classNames = `${styles.button} ${typeClass} ${variantClass} ${sizeClass} ${className}`;

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...restProps}
      variant="brown"
    >
      {children}
      {isArrow && type === 'box' && (
        <img src={arrowBrown} alt="화살표 이미지" />
      )}
    </button>
  );
}

export default Button;
