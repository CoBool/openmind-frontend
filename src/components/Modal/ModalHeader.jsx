import styles from './QuestionModal.module.css';
import { Icon } from '@/components/Icon';

/**
 * 모달 헤더 컴포넌트
 *
 * 제목과 닫기 버튼을 표시
 *
 * @param {function} onClose - 닫기 버튼 클릭 시 실행할 함수
 */

function ModalHeader({ onClose }) {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <Icon name="messages" className={styles.icon} />
        <h2 className={styles.title}>질문을 작성하세요</h2>
      </div>

      {/* 닫기 버튼 */}
      <button
        className={styles.closeButton}
        onClick={onClose}
        type="button"
        aria-label="모달 닫기"
      >
        <Icon name="close" />
      </button>
    </div>
  );
}

export default ModalHeader;
