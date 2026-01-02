import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import styles from '../Dropdown/Dropdown.module.css';

// 옵션 목록
const DROPDOWN_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '이름순', value: 'name' },
];

function Dropdown({ value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 현재 선택한 옵션 표시
  const selectedOption = DROPDOWN_OPTIONS.find(opt => opt.value === value);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // 이벤트 리스너
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = () => {
    if (disabled) return;
    setOpen(prev => !prev);
  };

  const handleOptionClick = value => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={[
        styles.dropdown,
        open && styles.dropdownOpen,
        disabled && styles.dropdownDisabled,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        className={styles.button}
        type="button"
        disabled={disabled}
        onClick={handleClick}
      >
        <span>{selectedOption?.label}</span>
        <Icon name={open ? 'arrowUp' : 'arrowDown'} className={styles.dropdownArrow} />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && !disabled && (
        <ul className={styles.dropdownMenu}>
          {DROPDOWN_OPTIONS.map(option => {
            const isSelected = option.value === value;

            return (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={isSelected ? styles.selected : ''}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
