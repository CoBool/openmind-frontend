import { useCallback, useState } from 'react';

function useShareAction(action) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await action();
    } catch (error) {
      console.error('[ShareAction Error]', error);
    } finally {
      setIsLoading(false);
    }
  }, [action, isLoading]);

  return {
    execute,
    isLoading,
  };
}

export default useShareAction;
