import styles from './Skeleton.module.css';

/**
 * @param {string} width - 너비 (예: '100%', '50px')
 * @param {string} height - 높이 (예: '1px', '100%')
 * @param {string} variant - 모양 ('circle' | 'rect' | 'text')
 * @param {string} className - 추가적인 커스텀 스타일
 */
function Skeleton({
  width,
  height,
  variant = 'rect',
  className = '',
  style,
  ...props
}) {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export { Skeleton };
