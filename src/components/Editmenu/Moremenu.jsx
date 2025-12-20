import { useEffect, useRef, useState } from "react";
import MoreIcon from "../../assets/Icon/More.svg?react";
import EditMenu from "./Editmenu";
import styles from "./MoreMenu.module.css";

function MoreMenu({ disabled = false, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.moreMenuWrapper} ref={ref}>
      <button
        type="button"
        className={styles.moreButton}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreIcon className={styles.moreIcon} />
      </button>

      {open && (
        <EditMenu
          disabled={disabled}
          onEdit={() => {
            onEdit?.();
            setOpen(false);
          }}
          onDelete={() => {
            onDelete?.();
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default MoreMenu;
