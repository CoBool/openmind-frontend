import { useCallback } from 'react';

function useFacebookShare() {
  const shareFacebook = useCallback(async ({ url }) => {
    if (!url) {
      throw new Error('Facebook share requires a url');
    }

    const shareUrl =
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);

    const popup = window.open(shareUrl, '_blank', 'noopener,noreferrer');

    // 팝업 차단 케이스
    if (!popup) {
      throw new Error('Facebook share popup was blocked');
    }
  }, []);

  return { shareFacebook };
}

export default useFacebookShare;
