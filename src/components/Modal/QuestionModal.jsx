// QuestionModal.jsx
import { createPortal } from 'react-dom';
import { useState } from 'react';
import Button from '../Button/Button';
import styles from './QuestionModal.module.css';
import Messages from '../../assets/Icon/Messages.svg';
import profile from '../../assets/images/profile.png';

function QuestionModal({ isOpen, setIsOpen }) {
  const [content, setContent] = useState('');
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.content}>
          {/* 헤더 */}
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <img src={Messages} alt="메세지 아이콘" className={styles.icon} />
              <h2 className={styles.title}>질문을 작성하세요</h2>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ✕
            </button>
          </div>

          {/* 받는 사람 */}
          <div className={styles.recipient}>
            <span className={styles.toLabel}>To.</span>
            <img src={profile} alt="아초는고양이" className={styles.avatar} />
            <span className={styles.recipientName}>아초는고양이</span>
          </div>

          {/* 입력 영역 */}
          <textarea
            className={styles.textarea}
            placeholder="질문을 입력해주세요"
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          {/* 제출 버튼*/}
          <Button
            type="box"
            variant="brown"
            size="md"
            className={styles.submitButton} // 추가 스타일 적용해야함
            disabled={!content.trim()}
          >
            질문 보내기
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default QuestionModal;
