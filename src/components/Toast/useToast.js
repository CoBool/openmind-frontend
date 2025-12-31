import { useState, useEffect, useCallback } from 'react';

import { subscribe, getState, dispatch, toast } from './toast-store.js';

function useToast() {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return () => unsubscribe();
  }, []);

  const dismiss = useCallback((toastId) => {
    dispatch({ type: 'DISMISS_TOAST', toastId });
  }, []);

  return {
    ...state,
    toast,
    dismiss,
  }
}

export { useToast, toast }