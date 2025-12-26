import { useState } from 'react';

import { Modal, useModal } from './Modal';

export function QuestionModal({ recipient, onSubmit }) {
  const { closeModal } = useModal();

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setContent('');
    closeModal();
  };

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(content);
      handleClose();
      alert('질문 등록 성공.');
    } catch (error) {
      console.error('질문 등록 실패', error);
      alert('질문 등록 실패.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <div>
        <header>임시 모달 헤더</header>
        <main>
          <span>To. {recipient.name}</span>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="질문을 입력해주세요"
            disabled={isSubmitting}
          ></textarea>
        </main>
        <footer>
          <button
            disabled={!content.trim() || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? '전송 중...' : '질문 보내기'}
          </button>
          <button onClick={handleClose}>취소</button>
        </footer>
      </div>
    </Modal>
  );
}
