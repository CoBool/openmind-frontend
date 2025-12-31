import { useMemo } from 'react';

import { useClipboard } from '@/hooks/share';
import { useKakaoShare } from '@/hooks/share';
import { useFacebookShare } from '@/hooks/share';
import { useShareAction } from '@/hooks/share';

import LinkIcon from '@/assets/Icon/Link.svg';
import KakaoIcon from '@/assets/Icon/kakao.svg';
import FacebookIcon from '@/assets/Icon/facebook.svg';

import styles from './ShareButtons.module.css';

function ShareButtons({ url, title, description, imageUrl }) {
  const { copy } = useClipboard();
  const { shareKakao } = useKakaoShare();
  const { shareFacebook } = useFacebookShare();

  const copyAction = useShareAction(() => copy(url));
  const kakaoAction = useShareAction(() =>
    shareKakao({ url, title, description, imageUrl })
  );
  const facebookAction = useShareAction(() => shareFacebook({ url }));

  // 버튼 정의는 데이터로 고정 (렌더마다 새 배열 생성 방지)
  const buttons = useMemo(
    () => [
      {
        key: 'copy',
        icon: LinkIcon,
        label: 'URL 복사',
        action: copyAction.execute,
        loading: copyAction.isLoading,
        className: styles.copyButton,
      },
      {
        key: 'kakao',
        icon: KakaoIcon,
        label: '카카오톡 공유',
        action: kakaoAction.execute,
        loading: kakaoAction.isLoading,
        className: styles.kakaoButton,
      },
      {
        key: 'facebook',
        icon: FacebookIcon,
        label: '페이스북 공유',
        action: facebookAction.execute,
        loading: facebookAction.isLoading,
        className: styles.facebookButton,
      },
    ],
    [
      copyAction.execute,
      copyAction.isLoading,
      kakaoAction.execute,
      kakaoAction.isLoading,
      facebookAction.execute,
      facebookAction.isLoading,
    ]
  );

  return (
    <ul className={styles.shareButtons}>
      {buttons.map(button => (
        <ShareButton
          key={button.key}
          className={button.className}
          icon={button.icon}
          label={button.label}
          action={button.action}
          disabled={button.loading}
        />
      ))}
    </ul>
  );
}

function ShareButton({ className = '', icon, label, action, disabled }) {
  return (
    <li className={`${styles.shareButton} ${className}`}>
      <button
        type="button"
        onClick={action}
        disabled={disabled}
        aria-label={label}
        className={className}
      >
        <img src={icon} alt={label} aria-hidden="true" />
      </button>
    </li>
  );
}

export default ShareButtons;
