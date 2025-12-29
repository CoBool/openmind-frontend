import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import TextArea from '@/components/TextArea/TextArea';
import QuestionTarget from '@/components/Modal/QuestionTarget';
import ModalHeader from '@/components/Modal/ModalHeader';
import { useToast } from '@/contexts/Toast/ToastCopy';
import styles from './QuestionModal.module.css';

/**
 * 질문 작성 모달 컴포넌트
 *
 * @param {boolean} isOpen - 모달 열림/닫힘 (true/false)
 * @param {function} onClose - 모달 닫기 함수
 * @param {object} recipient - 받는 사람 정보 { name, imageSource }
 * @param {function} onSuccess - 질문 제출 시 실행할 콜백 함수 (content를 인자로 받음)
 */
function QuestionModal({ isOpen, onClose, recipient, onSuccess }) {
  // 입력 내용 상태
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  // 모달 닫았을 시 내용 삭제
  const handleClose = () => {
    setContent('');
    onClose();
  };
  const handleSubmit = async () => {
    // 전송 시작 (버튼 비활성화)
    setIsSubmitting(true);

    try {
      // 부모가 전달한 callback 실행 (content만 전달)
      await onSuccess(content);

      // 성공 시 처리
      setContent('');
      onClose();
      showToast('질문이 등록되었습니다');
    } catch (error) {
      // 실패 시 에러 처리
      console.error('질문 등록 실패:', error);
      showToast('질문 등록에 실패했습니다');
    } finally {
      setIsSubmitting(false); // 버튼 보이게
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.content}>
        {/* 헤더: 제목 + 닫기  X 버튼 */}
        <ModalHeader onClose={handleClose} />
        {/* 받는 사람 정보*/}
        <QuestionTarget target={recipient} />

        {/* 질문 입력창 */}
        <TextArea
          placeholder="질문을 입력해주세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={isSubmitting}
          className={styles.textarea}
        />

        {/* 제출 버튼 */}
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
