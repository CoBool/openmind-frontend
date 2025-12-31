import { Avatar } from '@/components/Avatar';
import { ShareButtons } from '@/components/ShareButtons';

import Logo from '@/assets/images/logo.png';

import styles from './PostHeader.module.css';

function PostHeader({ subject }) {
  return (
    <header className={styles.header}>
      <div className={styles.heroBackground}>
        <div className={styles.logoWrapper}>
          <img className={styles.logoImage} src={Logo} alt="logo" />
        </div>
      </div>
      <div className={styles.profileContent}>
        <Avatar className={styles.avatarWrapper}>
          <Avatar.Image src={subject.imageSource} alt={subject.name} />
          <Avatar.Fallback>{subject.name}</Avatar.Fallback>
        </Avatar>
        <h1 className={styles.username}>{subject.name}</h1>
      </div>
      <div className={styles.shareGroup}>
        <ShareButtons
          url={window.location.href}
          title={`${subject.name}에게 무엇이든 물어보세요.`}
          description={`익명으로 질문하고, 답변을 확인해보세요.`}
          imageUrl={subject.imageSource}
        />
      </div>
    </header>
  );
}

export default PostHeader;
