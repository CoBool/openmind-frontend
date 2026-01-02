import { Icon } from '@/components/Icon';

import styles from './Editmenu.module.css';

export default function Editmenu({ isAnswered, onEdit, onDelete, onReject }) {
  const run = callback => () => {
    callback?.();
  };

  return (
    <div className={styles.menu}>
      {!isAnswered && (
        <button type="button" className={styles.item} onClick={run(onReject)}>
          <Icon name="rejection" className={styles.icon} />
          거절하기
        </button>
      )}

      {isAnswered && (
        <button type="button" className={styles.item} onClick={run(onEdit)}>
          <Icon name="edit" className={styles.icon} />
          수정하기
        </button>
      )}

      <button
        type="button"
        className={`${styles.item} ${styles.itemDanger}`}
        onClick={run(onDelete)}
      >
        <Icon name="close" className={styles.icon} />
        삭제하기
      </button>
    </div>
  );
}
