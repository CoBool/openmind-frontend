// src/components/common/Editmenu/Editmenu.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './Editmenu.module.css';

export default function Editmenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleToggleMenu = () => setOpen((v) => !v);

  const handleClickEdit = () => {
    setOpen(false);
    onEdit?.();
  };

  const handleClickDelete = () => {
    setOpen(false);
    onDelete?.();
  };

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <button type="button" className={styles.kebab} onClick={handleToggleMenu}>
        ...
      </button>

      {open && (
        <div className={styles.menu}>
          <button type="button" className={styles.item} onClick={handleClickEdit}>
            수정하기
          </button>
          <button type="button" className={styles.itemDanger} onClick={handleClickDelete}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
