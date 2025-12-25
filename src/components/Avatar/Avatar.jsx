import { createContext, useContext, useState } from 'react';

const AvatarContext = createContext();

import styles from './Avatar.module.css';

const AVATAR_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
};

const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('Avatar 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

function Avatar({ className = '', children, ...props }) {
  const [status, setStatus] = useState(AVATAR_STATUS.IDLE);
  // 👇 구조 제약은 ref로 관리
  const imageRegisteredRef = useRef(false);

  return (
    <AvatarContext.Provider value={{ status, setStatus, imageRegisteredRef }}>
      <span className={`${styles.avatar} ${className}`} {...props}>
        {children}
      </span>
    </AvatarContext.Provider>
  );
}

function AvatarImage({ className, src, alt, ...props }) {
  const { setStatus, imageRegisteredRef } = useAvatar();

  useEffect(() => {
    if (imageRegisteredRef.current) {
      console.error('Avatar.Image는 하나만 사용할 수 있습니다.');
      return;
    }

    imageRegisteredRef.current = true;

    return () => {
      imageRegisteredRef.current = false;
    };
  }, []);

  return (
    <img
      className={`${styles.avatarImage} ${className}`}
      src={src}
      alt={alt}
      onLoad={() => setStatus(AVATAR_STATUS.LOADED)}
      onError={() => setStatus(AVATAR_STATUS.ERROR)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }) {
  const { status } = useAvatar();

  if (status === AVATAR_STATUS.LOADED) return null;

  return (
    <span className={`${styles.avatarFallback} ${className}`} {...props} />
  );
}

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { Avatar };
