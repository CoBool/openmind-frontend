import { useCallback } from 'react';

export default function ClipBoard({ className = '', textToCopy, children }) {
  const fallback = useCallback(() => {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';

    textarea.setAttribute('readonly', '');

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      console.log('Copied to clipboard (fallback)');
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    } finally {
      document.body.removeChild(textarea);
    }
  }, [textToCopy]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      console.log('Failed to copy to clipboard');
      fallback();
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
