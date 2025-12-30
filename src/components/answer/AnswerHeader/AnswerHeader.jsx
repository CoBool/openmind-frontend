import styles from "./AnswerHeader.module.css";

export function AnswerHeader({ name = "아초는고양이", questionCount = 3, onAskClick }) {
  return (
    <section className={styles.wrap} aria-label="프로필 헤더">
      <div className={styles.avatar} aria-hidden="true">
        🐱
      </div>

      <h1 className={styles.name}>{name}</h1>

      <div className={styles.actions} aria-label="프로필 액션">
        <button className={styles.iconBtn} type="button" aria-label="편집">
          ✎
        </button>
        <button className={styles.iconBtn} type="button" aria-label="카카오톡">
          🟡
        </button>
        <button className={styles.iconBtn} type="button" aria-label="페이스북">
          f
        </button>

        <button className={styles.askBtn} type="button" onClick={onAskClick}>
          질문하러 가기
        </button>
      </div>

      <div className={styles.countRow}>
        <span className={styles.mail} aria-hidden="true">
          ✉
        </span>
        <span className={styles.countText}>{questionCount}개의 질문이 있습니다</span>
      </div>
    </section>
  );
}
