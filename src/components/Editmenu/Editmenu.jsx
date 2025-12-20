import styles from './EditMenu.module.css'
import EditIcon from '../../assets/Icon/Edit.svg'
import CloseIcon from '../../assets/Icon/Close.svg'

function EditMenu({ disabled = false, onEdit, onDelete }) {
  return (
    <ul className={`${styles.editMenu} ${disabled ? styles.disabled : ''}`}>
      <li
        className={styles.menuItem}
        onClick={() => {
          if (disabled) return
          onEdit?.()
        }}
      >
        <img src={EditIcon} className={styles.icon} />
        <span>수정하기</span>
      </li>

      <li
        className={`${styles.menuItem} ${styles.delete}`}
        onClick={() => {
          if (disabled) return
          onDelete?.()
        }}
      >
        <img src={CloseIcon} className={styles.icon} />
        <span>삭제하기</span>
      </li>
    </ul>
  )
}

export default EditMenu
