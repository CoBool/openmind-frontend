import { useState } from 'react';
import styles from './InputField.module.css';

function InputField({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  ...inputProps
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  return (
    <label
      htmlFor={id}
      className={`${styles.nameInputLabel} ${isFocused ? styles.nameInputFocus : styles.nameInputBasic}`}
    >
      {Icon && (
        <Icon
          className={`font-body3 ${styles.personIcon} ${isFocused ? styles.colorFocus : styles.colorBasic}`}
        />
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`font-body3 ${styles.nameInput}`}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
    </label>
  );
}

export default InputField;
