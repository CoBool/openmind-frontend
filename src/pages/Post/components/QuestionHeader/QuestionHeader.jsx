import { CardHeader, CardTitle } from '@/components/Card';
import { Icon } from '@/components/Icon';
import styles from './QuestionHeader.module.css';

export default function QuestionHeader({ questions }) {
  return (
    <CardHeader className={styles.questionHeader}>
      <CardTitle className={styles.questionHeaderTitle}>
        <Icon name="messages" />
        {questions?.results?.length
          ? `${questions?.results?.length}개의 질문이 있습니다`
          : '아직 질문이 없습니다'}
      </CardTitle>
    </CardHeader>
  );
}
