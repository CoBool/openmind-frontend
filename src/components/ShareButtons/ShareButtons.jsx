import { useMemo } from 'react';

import { toast } from '@/components/Toast';

import { useClipboard } from '@/hooks/share';
import { useKakaoShare } from '@/hooks/share';
import { useFacebookShare } from '@/hooks/share';
import { useShareAction } from '@/hooks/share';

import { Icon } from '@/components/Icon';

import styles from './ShareButtons.module.css';

function ShareButtons({ url, title, description, imageUrl }) {
  const { copy } = useClipboard();
  const { shareKakao } = useKakaoShare();
  const { shareFacebook } = useFacebookShare();

  const copyAction = useShareAction(() => {
    copy(url);
    toast({
      title: 'URL 복사 완료',
      description: 'URL이 클립보드에 복사되었습니다.',
    });
  });
  const kakaoAction = useShareAction(() => {
    shareKakao({ url, title, description, imageUrl })
    toast({
      title: '카카오톡 공유 완료',
      description: '카카오톡에서 공유되었습니다.',
    });
  });
  const facebookAction = useShareAction(() => {
    shareFacebook({ url });
    toast({
      title: '페이스북 공유 완료',
      description: '페이스북에서 공유되었습니다.',
    });
  });

  // 버튼 정의는 데이터로 고정 (렌더마다 새 배열 생성 방지)
  const buttons = useMemo(
    () => [
      {
        key: 'copy',
        icon: 'link',
        label: 'URL 복사',
        action: copyAction.execute,
        loading: copyAction.isLoading,
        className: styles.copyButton,
      },
      {
        key: 'kakao',
        icon: 'kakao',
        label: '카카오톡 공유',
        action: kakaoAction.execute,
        loading: kakaoAction.isLoading,
        className: styles.kakaoButton,
      },
      {
        key: 'facebook',
        icon: 'facebook',
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
        <Icon name={icon} />
      </button>
    </li>
  );
}

export default ShareButtons;
