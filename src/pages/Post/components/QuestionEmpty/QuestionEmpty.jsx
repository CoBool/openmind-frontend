import { Icon } from '@/components/Icon';

import styles from './QuestionEmpty.module.css';

export default function QuestionEmpty() {
  return (
    <div className={styles.questionEmpty}>
      <Icon name="empty" />
    </div>
  );
}
