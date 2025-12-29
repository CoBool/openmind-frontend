import { useState } from 'react';
import Button from '@/components/Button/Button';
import QuestionModal from '@/components/Modal/QuestionModal';

/**
 * Modal 테스트 페이지
 *
 * UI가 잘 작동하는지 테스트
 * - 콘솔에서 질문 내용 확인
 */
export default function ModalTest() {
  const [isOpen, setIsOpen] = useState(false);

  // 테스트용 받는 사람 정보
  const recipient = {
    name: '테스트용',
    imageSource:
      'https://fastly.picsum.photos/id/505/200/200.jpg?hmac=c295sjTIAZ_9Gj-PENrzAbATNIiWPL1dmhIhWndYnyo', // 임시 이미지
  };
  const testSubjectId = 12629; // 실제 존재하는 ID Test

  const QuestionSuccess = newQuestion => {
    console.log('질문 등록 성공!', newQuestion);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Modal 테스트</h1>

      <br />
      <br />

      {/* QuestionModal 테스트 버튼 */}
      <Button onClick={() => setIsOpen(true)}>질문 모달 열기</Button>

      {/* QuestionModal */}
      <QuestionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        recipient={recipient}
        subjectId={testSubjectId}
        onSuccess={QuestionSuccess}
      />
    </div>
  );
}
