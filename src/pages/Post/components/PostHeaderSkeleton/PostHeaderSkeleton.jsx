// openmind-frontend/src/pages/Post/components/PostHeaderSkeleton/PostHeaderSkeleton.jsx
import { Skeleton } from '@/components/Skeleton';
import styles from './PostHeaderSkeleton.module.css';

export default function PostHeaderSkeleton() {
  return (
    <header className={styles.header}>
      <div className={styles.heroBackground} />
      <div className={styles.profileContent}>
        <Skeleton
          variant="circle"
          width="104px"
          height="104px"
          className={styles.avatar}
        />
        <Skeleton
          variant="rect"
          width="120px"
          height="30px"
          className={styles.username}
        />
      </div>
      <div className={styles.shareGroup}>
        <Skeleton
          variant="circle"
          width="24px"
          height="24px"
          className={styles.shareButton}
        />
        <Skeleton
          variant="circle"
          width="24px"
          height="24px"
          className={styles.shareButton}
        />
        <Skeleton
          variant="circle"
          width="24px"
          height="24px"
          className={styles.shareButton}
        />
      </div>
    </header>
  );
}