import { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { createQuestion } from '@/services/questionsApi';
import styles from './QuestionModal.module.css';
import Messages from '@/assets/Icon/Messages.svg';
import Close from '@/assets/Icon/Close.svg';

/**
 * 질문 작성 모달 컴포넌트 (API 연동 완료)
 *
 * 질문을 작성하고 서버에 전송
 *
 * @param {boolean} isOpen - 모달 열림/닫힘 (true/false)
 * @param {function} onClose - 모달 닫기 함수
 * @param {object} recipient - 받는 사람 정보 { name, imageSource }
 * @param {number} subjectId - 질문 받을 사람의 ID (서버 전송 시 필요)
 * @param {function} onSuccess - 질문 등록 성공 시 실행할 함수
 */
function QuestionModal({ isOpen, onClose, recipient, subjectId, onSuccess }) {
  // 질문 내용 상태
  // 사용자가 textarea에 입력하는 내용을 저장
  const [content, setContent] = useState('');

  // 전송 중 상태
  // true: API 호출 중 (버튼 비활성화, 중복 클릭 방지)
  // false: 대기 중
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모달 닫았을 시 내용 삭제
  const handleClose = () => {
    setContent('');
    onClose();
  };
  const handleSubmit = async () => {
    // 전송 시작 (버튼 비활성화)
    setIsSubmitting(true);

    try {
      // API 호출
      const newQuestion = await createQuestion(subjectId, { content });

      // 성공 시 처리
      setContent(''); // 입력창 비우기
      onClose(); // 모달 닫기
      onSuccess(newQuestion); // 부모에게 새 질문 데이터 전달
      console.log('onSuccess  성공내역 ', newQuestion);
    } catch (error) {
      // 실패 시 에러 처리
      console.error('질문 등록 실패:', error);
      alert('질문 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      // 전송 종료
      alert('질문 등록 성공했습니다.!');
      setIsSubmitting(false); // 버튼 보이게
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.content}>
        {/* ========================================
            헤더: 제목 + 닫기 버튼
            ======================================== */}
        <div className={styles.header}>
          {/* 제목 영역 */}
          <div className={styles.titleWrapper}>
            <img className={styles.icon} src={Messages} alt="메시지 아이콘" />
            <h2 className={styles.title}>질문을 작성하세요</h2>
          </div>

          {/* 닫기 버튼 (X 버튼) */}
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            {/* 닫기 */}
            <img src={Close} alt="닫기" />
          </button>
        </div>

        {/* ========================================
            받는 사람 정보 표시
            ======================================== */}
        <div className={styles.recipient}>
          <span className={styles.toLabel}>To.</span>

          {/* 프로필 이미지 */}
          <img
            className={styles.profileImg}
            src={recipient.imageSource}
            alt=""
          />

          {/* 받는 사람 이름 */}
          <span className={styles.recipientName}>{recipient.name}</span>
        </div>

        {/* =================
            질문 입력 영역
            ================= */}
        <textarea
          className={styles.textarea}
          placeholder="질문을 입력해주세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={isSubmitting}
        />

        {/* =================
            제출 버튼
            ================= */}
        <Button
          className={styles.submitButton}
          onClick={handleSubmit} // 클릭하면 질문 전송
          disabled={!content.trim() || isSubmitting}

          // 비활성화 조건:
          // 1. 내용이 비어있거나 공백만 있으면
          // 2. 전송 중이면
        >
          {/* 전송 중이면 "전송 중..." 표시 */}
          {isSubmitting ? '전송 중...' : '질문 보내기'}
        </Button>
      </div>
    </Modal>
  );
}

export default QuestionModal;
