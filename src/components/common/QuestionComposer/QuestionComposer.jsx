import { useId, useMemo } from "react";
import styles from "./QuestionComposer.module.css";

/**
 * 질문 작성 "입력 영역"만 담당 (모달/오버레이 기능 없음)
 */
export function QuestionComposer({
  toName,
  value,
  onChange,
  onSubmit,
  placeholder = "질문을 입력해주세요",
  submitText = "질문 보내기",
  disabled = false,
  className = "",
}) {
  const titleId = useId();
  const textareaId = useId();

  const canSubmit = useMemo(() => {
    return !disabled && Boolean(String(value ?? "").trim());
  }, [value, disabled]);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      if (canSubmit) onSubmit?.();
    }
  };

  return (
    <section className={`${styles.wrap} ${className}`} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        질문을 작성하세요
      </h2>

      {toName ? (
        <div className={styles.toRow}>
          <span className={styles.toLabel}>To.</span>
          <div className={styles.toUser}>
            <div className={styles.toAvatar} aria-hidden="true">
              🙂
            </div>
            <span className={styles.toName}>{toName}</span>
          </div>
        </div>
      ) : null}

      <label className={styles.srOnly} htmlFor={textareaId}>
        질문 내용
      </label>

      <textarea
        id={textareaId}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className={styles.submitBtn}
        onClick={() => canSubmit && onSubmit?.()}
        disabled={!canSubmit}
      >
        {submitText}
      </button>

      <p className={styles.hint}>Ctrl/⌘ + Enter로 제출</p>
    </section>
  );
}
