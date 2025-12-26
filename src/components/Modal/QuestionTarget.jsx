import styles from './QuestionModal.module.css';

/**
 * 질문 대상자 정보 컴포넌트
 *
 * @param {object} target - 질문 받을 사람 정보
 * @param {string} target.name - 이름
 * @param {string} target.imageSource - 프로필 이미지 URL
 */

function QuestionTarget({ target }) {
  return (
    <div className={styles.target}>
      <span className={styles.toLabel}>To.</span>

      {/* 프로필 이미지 */}
      <img
        className={styles.profileImg}
        src={target.imageSource}
        alt={`${target.name} 프로필`}
      />

      {/* 받는 사람 이름 */}
      <span className={styles.targetName}>{target.name}</span>
    </div>
  );
}

export default QuestionTarget;
