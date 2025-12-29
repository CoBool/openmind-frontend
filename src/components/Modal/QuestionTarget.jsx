import styles from './QuestionModal.module.css';
import { Avatar } from '@/components/Avatar/Avatar';
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

      {/* Avatar 컴포넌트로 교체 */}
      <Avatar className={styles.profileImg}>
        {/* 이미지 로딩 시도 */}
        <Avatar.Image src={target.imageSource} alt={`${target.name} 프로필`} />

        {/* 이미지 로딩 실패 시 대체 UI (이름 첫 글자) */}
        <Avatar.Fallback>{target.name[0]}</Avatar.Fallback>
      </Avatar>

      {/* 받는 사람 이름 */}
      <span className={styles.targetName}>{target.name}</span>
    </div>
  );
}

export default QuestionTarget;
