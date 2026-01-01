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
  return (
    <label htmlFor={id} className={styles.nameInputLabel}>
      {/* {Icon && <Icon/>} */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`font-body3 ${styles.nameInput}`}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </label>
  );
}

export default InputField;
