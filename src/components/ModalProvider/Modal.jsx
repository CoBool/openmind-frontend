import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(prev => !prev);

  const value = {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal은 ModalProvider 내부에서 사용해야 합니다.');
  }
  return context;
};

export function Modal({ children }) {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  const targetElement = document.getElementById('portal') || document.body;

  return createPortal(
    <div onClick={closeModal}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>,
    targetElement
  );
}
