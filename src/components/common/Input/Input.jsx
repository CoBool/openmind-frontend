import { useId, useMemo, useState } from 'react';
import styles from './Input.module.css';

/**
 * Reusable controlled Input component (supports input / textarea) with basic validation.
 *
 * Props:
 * - label?: string
 * - name?: string
 * - type?: string ('text' | 'email' | 'password' | ...)
 * - as?: 'input' | 'textarea' (default 'input')
 * - value: string
 * - onChange: (e) => void
 * - onBlur?: (e) => void
 * - placeholder?: string
 * - required?: boolean
 * - pattern?: RegExp
 * - validate?: (value: string) => string | null  // return error message
 * - error?: string                               // external error message (highest priority)
 * - helperText?: string
 * - disabled?: boolean
 * - maxLength?: number
 */
export default function Input({
  label,
  name,
  type = 'text',
  as = 'input',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  pattern,
  validate,
  error,
  helperText,
  disabled = false,
  maxLength,
  className,
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const normalizedValue = value ?? '';

  const computedError = useMemo(() => {
    // 1) external error wins (useful for server-side validation)
    if (error) return error;

    // Only validate after touch (blur)
    if (!touched) return null;

    const v = String(normalizedValue).trim();

    // 2) required
    if (required && v.length === 0) {
      // If label is present, use it to form a natural message.
      if (label) return `${label}을 입력해주세요.`;
      return '값을 입력해주세요.';
    }

    // 3) pattern (e.g., email)
    if (v.length > 0 && pattern instanceof RegExp && !pattern.test(v)) {
      // If it's an email field, show a more specific message
      if (type === 'email') return '잘못된 이메일 형식입니다.';
      return '형식이 올바르지 않습니다.';
    }

    // 4) custom validate
    if (typeof validate === 'function') {
      const msg = validate(v);
      if (typeof msg === 'string' && msg.trim().length > 0) return msg;
    }

    return null;
  }, [error, touched, normalizedValue, required, pattern, validate, label, type]);

  const Field = as === 'textarea' ? 'textarea' : 'input';

  const handleBlur = (e) => {
    setTouched(true);
    onBlur?.(e);
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required ? <span className={styles.required} aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <Field
        id={id}
        name={name}
        type={Field === 'input' ? type : undefined}
        className={[styles.field, computedError ? styles.fieldError : ''].filter(Boolean).join(' ')}
        value={normalizedValue}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(computedError)}
        aria-describedby={computedError || helperText ? `${id}-help` : undefined}
        maxLength={maxLength}
      />

      {computedError ? (
        <div id={`${id}-help`} className={styles.error} role="alert">
          {computedError}
        </div>
      ) : helperText ? (
        <div id={`${id}-help`} className={styles.helper}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
