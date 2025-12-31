import { useId } from "react";
import styles from "./NameInputCard.module.css";

export function NameInputCard({
  value,
  onChange,
  onSubmit,
  placeholder = "이름을 입력하세요",
  buttonText = "질문 받기",
  disabled = false,
  className = "",
}) {
  const inputId = useId();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit?.();
  };

  return (
    <section className={`${styles.card} ${className}`} aria-label="이름 입력">
      <label className={styles.srOnly} htmlFor={inputId}>
        이름
      </label>

      <div className={styles.inputWrap}>
        <span className={styles.icon} aria-hidden="true">
          <UserIcon />
        </span>

        <input
          id={inputId}
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoComplete="name"
          disabled={disabled}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={() => onSubmit?.()}
        disabled={disabled || !String(value ?? "").trim()}
      >
        {buttonText}
      </button>
    </section>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.505 4.505 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 20.5a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
