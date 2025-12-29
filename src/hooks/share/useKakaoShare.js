import { useEffect, useCallback } from 'react';

// 실제 배포 시에는 환경변수로 관리
const KAKAO_KEY = '3f8c14bb5178f8b8a226d25a3f28454b';

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js';

function useKakaoShare() {
  // 1. Kakao SDK 로드 + 초기화
  useEffect(() => {
    // 이미 SDK 있고 init까지 끝났으면 종료
    if (window.Kakao && window.Kakao.isInitialized()) {
      return;
    }

    // 이미 script가 있으면 재사용
    const existingScript = document.querySelector(
      `script[src="${KAKAO_SDK_URL}"]`
    );

    if (existingScript) {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.integrity =
      'sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p';
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      if (!window.Kakao) {
        return;
      }

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_KEY);
      }
    };

    document.head.appendChild(script);
  }, []);

  // 2. 공유 action (Promise 기반)
  const shareKakao = useCallback(
    async ({ url, title, description, imageUrl }) => {
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        throw new Error('Kakao SDK is not initialized');
      }

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    },
    []
  );

  return { shareKakao };
}

export default useKakaoShare;
