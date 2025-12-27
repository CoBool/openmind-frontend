import { CardHeader, CardTitle } from '@/components/Card';
import Messages from '@/assets/Icon/Messages.svg?react';
import styles from './QuestionHeader.module.css';

export default function QuestionHeader({ questions }) {
  return (
    <CardHeader className={styles.questionHeader}>
      <CardTitle className={styles.questionHeaderTitle}>
        <Messages />
        {questions?.count
          ? `${questions?.count}개의 질문이 있습니다`
          : '아직 질문이 없습니다'}
      </CardTitle>
    </CardHeader>
  );
}
