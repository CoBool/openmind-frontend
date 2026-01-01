import styles from './Label.module.css';

function Label({ className = '', ...props }) {
  return (
    <label
      className={`${styles.label} ${className}`}
      {...props}
    />
  );
}

export default Label;
