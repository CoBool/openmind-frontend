import styles from './FloatingButton.module.css'

function FloatingButton({ onClick, children, type = 'write' }) {
  const typeClass = type === 'delete' ? styles.delete : styles.write

  return (
    <button className={`${styles.button} ${typeClass}`} onClick={onClick}>
      {children}
      {type == 'write' && <span className={`${styles.extraText}`}>하기</span>}
    </button>
  )
}

export default FloatingButton
