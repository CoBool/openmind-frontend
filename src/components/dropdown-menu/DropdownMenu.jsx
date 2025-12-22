import { createContext, useContext, useState } from 'react';

const DropdownContext = createContext(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

function Dropdown({ children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(prev => !prev);

  const value = {
    isOpen: open,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}

function Trigger({ children }) {
  const { onToggle } = useDropdown();

  return (
    <button type="button" onClick={onToggle}>
      {children}
    </button>
  );
}

function Menu({ children }) {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return <ul>{children}</ul>;
}

function Item({ children, onClick }) {
  const { onClose } = useDropdown();

  const handleClick = e => {
    onClick?.(e);
    onClose();
  };

  return <li onClick={handleClick}>{children}</li>;
}

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export { Dropdown };
