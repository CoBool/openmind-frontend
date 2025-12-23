// src/pages/ModalTest.jsx
import { useState } from 'react';
import QuestionModal from './QuestionModal';
import Button from '../../components/Button/Button';

export default function ModalTest() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <div>
      {/* // style={{ padding: '40px' }} */}
      <h1>모달 테스트 페이지</h1>

      <button onClick={handleOpenModal}>모달 열기</button>

      <QuestionModal isOpen={isOpen} setIsOpen={handleCloseModal} />

      {/* Box 버튼 - 기본 */}
      <Button type="box" variant="brown" size="md">
        질문받기
      </Button>
      {/* Box 버튼 - 전체 너비 (외부 제어) */}
      <Button
        type="box"
        variant="brown"
        size="md"
        // style={{ width: '100%' }}
      >
        로그인
      </Button>
      {/* Floating 버튼 */}
      <Button type="floating" size="md">
        질문 작성
      </Button>
      <Button type="floating" size="sm">
        삭제 하기
      </Button>
      {/*  비활성화 */}
      <Button type="box" variant="brown" disabled>
        제출
      </Button>
      {/* 화살표 아이콘 */}
      <Button type="box" variant="beige" isArrow>
        질문하러 가기
      </Button>
    </div>
  );
}
