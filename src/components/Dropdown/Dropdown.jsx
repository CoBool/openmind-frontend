import { useEffect, useRef, useState } from 'react'
import ArrowDown from '../../assets/Icon/Arrow-down.svg'
import ArrowUp from '../../assets/Icon/Arrow-up.svg'
import styles from '../Dropdown/Dropdown.module.css'

function Dropdown({ value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const options = [
    { label: '최신순', value: 'latest' },
    { label: '이름순', value: 'name' },
  ]

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

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

      {open && !disabled && (
        <ul className={styles.dropdownMenu}>
          {options.map(option => (
            <li
              key={option.value} // ✅ 핵심
              onClick={() => {
                onChange(option.value) // 부모로 전달
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
