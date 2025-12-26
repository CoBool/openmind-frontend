import { useState } from 'react';
import { useModal } from '@/components/ModalProvider/ModalProvider';

export function TestModal({ callback }) {
  const [text, setText] = useState('');
  const { closeModal } = useModal();

  const handleClose = () => {
    setText('');
    closeModal();
  };

  const handleSubmit = () => {
    callback(text);
    handleClose();
  };

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleClose}>닫기</button>
      <button onClick={handleSubmit}>전송</button>
    </div>
  );
}
