import styles from './EditMenu.module.css';
import EditIcon from '../../assets/Icon/Edit.svg';
import CloseIcon from '../../assets/Icon/Close.svg';

function EditMenu({ disabled = false, onEdit, onDelete }) {
  const handleEdit = () => {
    if (disabled) return;
    onEdit?.();
  };

  const handleDelete = () => {
    if (disabled) return;
    onDelete?.();
  };

  return (
    <ul className={`${styles.editMenu} ${disabled ? styles.disabled : ''}`}>
      <li className={styles.menuItem} onClick={handleEdit}>
        <img src={EditIcon} className={styles.icon} />
        <span>수정하기</span>
      </li>

      <li
        className={`${styles.menuItem} ${styles.delete}`}
        onClick={handleDelete}
      >
        <img src={CloseIcon} className={styles.icon} />
        <span>삭제하기</span>
      </li>
    </ul>
  );
}

export default EditMenu;
