import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Dialog.module.css';

const DialogContext = createContext(null);

const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog은 Dialog 내부에서 사용해야 합니다.');
  }

  return context;
};

function Dialog({ open, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const _open = isControlled ? open : internalOpen;
  const _setOpen = isControlled ? onOpenChange : setInternalOpen;

  const value = {
    open: _open,
    setOpen: _setOpen,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

function DialogTrigger({ className = '', onClick, children, ...props }) {
  const { setOpen } = useDialog();

  const handleClick = e => {
    onClick?.(e);
    setOpen(true);
  };

  return (
    <button
      type="button"
      className={`${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogPortal({ children }) {
  const { open } = useDialog();

  if (!open) return null;
  const targetElement = document.getElementById('portal') || document.body;

  return createPortal(children, targetElement);
}

function DialogOverlay({ children }) {
  const { setOpen } = useDialog();
  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      {children}
    </div>
  );
}

function DialogContent({ className = '', children }) {
  const { open, setOpen } = useDialog();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setOpen(false);
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={`${styles.content} ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </DialogPortal>
  );
}

function DialogClose({ className = '', children }) {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      className={`${className}`}
      onClick={() => setOpen(false)}
    >
      {children}
    </button>
  );
}

export { Dialog, DialogTrigger, DialogContent, DialogClose };
