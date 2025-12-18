import styles from "./EditMenu.module.css";
import EditIcon from "../../assets/Icon/Edit.svg?react";
import CloseIcon from "../../assets/Icon/Close.svg?react";

function EditMenu({ disabled = false, onEdit, onDelete }) {
  return (
    <ul className={`${styles.editMenu} ${disabled ? styles.disabled : ""}`}>
      <li
        className={styles.menuItem}
        onClick={() => {
          if (disabled) return;
          onEdit?.();
        }}
      >
        <EditIcon className={styles.icon} />
        <span>수정하기</span>
      </li>

      <li
        className={`${styles.menuItem} ${styles.delete}`}
        onClick={() => {
          if (disabled) return;
          onDelete?.();
        }}
      >
        <CloseIcon className={styles.icon} />
        <span>삭제하기</span>
      </li>
    </ul>
  );
}

export default EditMenu;
