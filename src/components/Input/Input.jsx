import styles from "./Input.module.css"

function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`${styles.input} ${className}`}
      {...props}
    />
  )
}

export { Input }
