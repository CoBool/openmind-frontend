import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import EditMenu from './Editmenu';
import styles from './Moremenu.module.css';

// 드롭다운 기능 겹쳐 추후 재사용 가능하도록 수정
function MoreMenu({ disabled = false, onEdit, onDelete }) {
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

  const closeMenu = () => {
    setOpen(false);
  };

  const createMenu = callback => () => {
    callback?.();
    closeMenu();
  };

  return (
    <div className={styles.moreMenuWrapper} ref={ref}>
      <button
        type="button"
        className={styles.moreButton}
        disabled={disabled}
        onClick={handleToggle}
      >
        <Icon name="more" className={styles.moreIcon} />
      </button>

      {open && (
        <EditMenu
          disabled={disabled}
          onEdit={createMenu(onEdit)}
          onDelete={createMenu(onDelete)}
        />
      )}
    </div>
  );
}

export default MoreMenu;
