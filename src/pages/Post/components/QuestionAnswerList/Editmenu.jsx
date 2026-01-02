import styles from './Editmenu.module.css';

export default function Editmenu({ isAnswered, onEdit, onDelete, onReject }) {
  const run = callback => () => {
    callback?.();
  };

  return (
    <div className={styles.menu}>
      {!isAnswered && (
        <button type="button" className={styles.item} onClick={run(onReject)}>
          거절하기
        </button>
      )}

      {isAnswered && (
        <button type="button" className={styles.item} onClick={run(onEdit)}>
          수정하기
        </button>
      )}

      <button
        type="button"
        className={`${styles.item} ${styles.itemDanger}`}
        onClick={run(onDelete)}
      >
        삭제하기
      </button>
    </div>
  );
}
