import { useCallback } from 'react';

function useClipboard() {
  const copyToClipboardFallback = useCallback(text => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
      const success = document.execCommand('copy');
      if (!success) {
        throw new Error('Failed to copy to clipboard');
      }
    } finally {
      document.body.removeChild(textarea);
    }
  }, []);

  const copy = useCallback(
    async text => {
      if (!navigator.clipboard) {
        copyToClipboardFallback(text);
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        copyToClipboardFallback(text);
      }
    },
    [copyToClipboardFallback]
  );

  return {
    copy,
  };
}

export default useClipboard;
