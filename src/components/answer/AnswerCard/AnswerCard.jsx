import { useId, useMemo, useState } from "react";
import styles from "./AnswerCard.module.css";

/**
 * 답변 카드 UI (API/저장/라우팅 없음 - UI 전용)
 *
 * props:
 * - status: "unanswered" | "answering" | "answered"
 */
export function AnswerCard({
  status = "unanswered",
  question = "좋아하는 동물은?",
  fromName = "아초는고양이",
  createdAt = "2일전",
  initialAnswer = "",
  onSubmit,
}) {
  const textareaId = useId();
  const [answer, setAnswer] = useState(initialAnswer);

  const isAnswered = status === "answered";
  const isDisabled = status === "unanswered" ? true : false; // 스샷처럼 1번째는 비활성
  const canSubmit = useMemo(() => {
    if (isAnswered) return false;
    if (isDisabled) return false;
    return Boolean(String(answer).trim());
  }, [answer, isAnswered, isDisabled]);

  return (
    <article className={styles.card} aria-label="답변 카드">
      <header className={styles.topRow}>
        <span className={`${styles.badge} ${isAnswered ? styles.badgeDone : ""}`}>
          {isAnswered ? "답변 완료" : "미답변"}
        </span>
        <button className={styles.moreBtn} type="button" aria-label="더보기">
          ⋯
        </button>
      </header>

      <div className={styles.meta}>
        <span className={styles.metaKey}>질문 ·</span>
        <span className={styles.metaValue}>{createdAt}</span>
      </div>

      <p className={styles.question}>{question}</p>

      <div className={styles.writerRow}>
        <div className={styles.writerAvatar} aria-hidden="true">
          🐱
        </div>
        <div className={styles.writerText}>
          <div className={styles.writerName}>{fromName}</div>
          <div className={styles.writerHint}>답변을 입력해주세요</div>
        </div>
      </div>

      {isAnswered ? (
        <p className={styles.answeredText}>{answer || initialAnswer}</p>
      ) : (
        <>
          <label className={styles.srOnly} htmlFor={textareaId}>
            답변
          </label>

          <textarea
            id={textareaId}
            className={`${styles.textarea} ${isDisabled ? styles.textareaDisabled : ""}`}
            placeholder="답변을 입력해주세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isDisabled}
          />

          <button
            type="button"
            className={`${styles.submit} ${!canSubmit ? styles.submitDisabled : ""}`}
            disabled={!canSubmit}
            onClick={() => onSubmit?.(answer)}
          >
            답변 완료
          </button>
        </>
      )}

      <footer className={styles.footer}>
        <button className={styles.footerBtn} type="button">
          ♡ 좋아요
        </button>
        <button className={styles.footerBtn} type="button">
          💬 답변
        </button>
      </footer>
    </article>
  );
}
