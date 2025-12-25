import styles from './QuestionModal.module.css';
import Messages from '@/assets/Icon/Messages.svg';
import Close from '@/assets/Icon/Close.svg';

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
        <img className={styles.icon} src={Messages} alt="메시지 아이콘" />
        <h2 className={styles.title}>질문을 작성하세요</h2>
      </div>

      {/* 닫기 버튼 */}
      <button
        className={styles.closeButton}
        onClick={onClose}
        type="button"
        aria-label="모달 닫기"
      >
        <img src={Close} alt="닫기" />
      </button>
    </div>
  );
}

export default ModalHeader;
