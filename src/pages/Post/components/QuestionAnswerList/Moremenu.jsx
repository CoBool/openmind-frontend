import { useEffect, useRef, useState } from 'react';
import MoreIcon from '../../../../assets/Icon/rename/More.svg';
import EditMenu from './Editmenu';
import styles from './Moremenu.module.css';

function MoreMenu({
  disabled = false,
  isAnswered,
  onEdit,
  onDelete,
  onReject,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setOpen(prev => !prev);
  };

  return (
    <div className={styles.moreMenuWrapper} ref={ref}>
      <button
        type="button"
        className={styles.moreButton}
        disabled={disabled}
        onClick={handleToggle}
      >
        <img src={MoreIcon} className={styles.moreIcon} />
      </button>

      {open && (
        <EditMenu
          isAnswered={isAnswered}
          onEdit={onEdit}
          onDelete={onDelete}
          onReject={onReject}
        />
      )}
    </div>
  );
}

export default MoreMenu;
