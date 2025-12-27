import { getTimeAgo } from '@/utils/date';

import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/Card';

import ThumbsUp from '@/assets/Icon/thumbsUp.svg?react';
import ThumbsDown from '@/assets/Icon/thumbsDown.svg?react';

import styles from './QuestionCard.module.css';

export default function QuestionCard({ question, onReaction, ref, children }) {
  const isAnswered = question.answer !== null;

  const handleReaction = type => {
    onReaction(question.id, type);
  };

  return (
    <Card ref={ref}>
      <CardHeader className={styles.header}>
        <div className={styles.top}>
          <span
            className={`
              ${styles.badge}
              ${isAnswered ? styles.badgeComplete : styles.badgePending}
            `}
          >
            {isAnswered ? '답변 완료' : '미답변'}
          </span>
        </div>

        <CardDescription className={styles.description}>
          <span className={styles.createdAt}>
            질문 · {getTimeAgo(question.createdAt)}
          </span>
          <h3 className={styles.question}>{question.content}</h3>
        </CardDescription>
      </CardHeader>
      {children}
      <CardFooter>
        <div className={styles.reactions}>
          <button
            className={styles.reactionButton}
            onClick={() => {
              handleReaction('like');
            }}
          >
            <ThumbsUp className={styles.reactionButtonIcon} />
            <span className={styles.reactionButtonText}>
              좋아요 {question.like ?? 0}
            </span>
          </button>
          <button
            className={styles.reactionButton}
            onClick={() => {
              handleReaction('dislike');
            }}
          >
            <ThumbsDown className={styles.reactionButtonIcon} />
            <span className={styles.reactionButtonText}>
              싫어요 {question.dislike ?? 0}
            </span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
