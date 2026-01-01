import styles from './TextArea.module.css';

/**
 * TextArea 컴포넌트
 *
 * 텍스트 입력 영역
 *
 * @param {string} placeholder - 입력 안내 문구
 * @param {string} value - 현재 입력된 텍스트 값
 * @param {function} onChange - 값 변경 시 실행할 함수 (이벤트)
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 스타일
 */
function TextArea({
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  autoFocus = false,
  defaultValue = '',
  ref,
}) {
  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange} 
      disabled={disabled}
      spellCheck={false} /* 맞춤법 검사 비활성화 */
      autoFocus={autoFocus}
      ref={ref}
    />
  );
}

export default TextArea;
