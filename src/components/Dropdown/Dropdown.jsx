import { useEffect, useRef, useState } from 'react'
import ArrowDown from '../../assets/Icon/Arrow-down.svg'
import ArrowUp from '../../assets/Icon/Arrow-up.svg'
import styles from '../Dropdown/Dropdown.module.css'

function Dropdown({ disabled = false }) {
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState('이름순')

  const dropdownRef = useRef(null)

  const option = ['이름순', '최신순']

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
      className={[
        styles.dropdown,
        open && styles.dropdownOpen,
        disabled && styles.dropdownDisabled,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={dropdownRef}
    >
      <button
        className={styles.button}
        onClick={() => {
          if (disabled) return
          setOpen(prev => !prev)
        }}
        type="button"
        disabled={disabled}
      >
        <span>{select}</span>
        <img
          src={open ? ArrowUp : ArrowDown}
          alt="화살표 모양"
          className={styles.dropdownArrow}
        />
      </button>

      {open && !disabled && (
        <ul className={styles.dropdownMenu}>
          {option.map(option => (
            <li
              key={option}
              onClick={() => {
                setSelect(option)
                setOpen(false)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
