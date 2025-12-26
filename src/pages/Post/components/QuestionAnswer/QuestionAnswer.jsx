import { Avatar } from '@/components/Avatar';
import { CardContent } from '@/components/Card';

import { getTimeAgo } from '@/utils/date';

import styles from './QuestionAnswer.module.css';

export default function QuestionAnswer({ answer, subject }) {
  console.log(answer);
  return (
    <CardContent className={styles.answerCard}>
      <Avatar className={styles.avatar}>
        <Avatar.Image src={subject?.imageSource + '/sss'} alt={subject?.name} />
        <Avatar.Fallback>{subject?.name}</Avatar.Fallback>
      </Avatar>
      <div className={styles.answerContent}>
        <header className={styles.answerHeader}>
          <span className={styles.authorName}>{subject?.name}</span>
          <span className={styles.divider}>·</span>
          <span className={styles.createdAt}>
            {getTimeAgo(answer.createdAt)}
          </span>
        </header>
        {answer.isRejected ? (
          <p
            className={`${styles.answerContentText} ${styles.answerContentTextRejected}`}
          >
            답변 거절
          </p>
        ) : (
          <p className={styles.answerContentText}>{answer.content}</p>
        )}
      </div>
    </CardContent>
  );
}
