import Empty from '@/assets/Icon/Empty.svg?react';

import styles from './QuestionEmpty.module.css';

export default function QuestionEmpty() {
  return (
    <div className={styles.questionEmpty}>
      <Empty />
    </div>
  );
}
