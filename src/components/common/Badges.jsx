import styles from './Badges.module.css'

function Badges({ children, className = '', ...props }) {
  return (
    <span className={`${styles.badgeBase} ${className}`} {...props}>
      {children}
    </span>
  )
}

export default Badges
