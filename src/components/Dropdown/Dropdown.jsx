import { useEffect, useRef, useState } from 'react'
import ArrowDown from '../../assets/Icon/Arrow-down.svg'
import ArrowUp from '../../assets/Icon/Arrow-up.svg'
import styles from '../Dropdown/Dropdown.module.css'

function Dropdown({ value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // 옵션 목록
  const options = [
    { label: '최신순', value: 'latest' },
    { label: '이름순', value: 'name' },
  ]

  // 현재 선택한 옵션 표시
  const selectedOption = options.find(opt => opt.value === value)

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    // 이벤트 리스너
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

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
        onClick={() => {
          if (!disabled) setOpen(prev => !prev)
        }}
      >
        <span>{selectedOption?.label}</span>
        <img
          src={open ? ArrowUp : ArrowDown}
          alt="화살표"
          className={styles.dropdownArrow}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {open && !disabled && (
        <ul className={styles.dropdownMenu}>
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
