import { CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import QuestionCardSkeleton from './QuestionCardSkeleton';
import headerStyles from '../QuestionHeader/QuestionHeader.module.css';
import shared from '../../Post.shared.module.css';
import styles from './QuestionListSkeleton.module.css';

export default function QuestionListSkeleton() {
  return (
    <>
      <CardHeader className={headerStyles.questionHeader}>
        <CardTitle className={headerStyles.questionHeaderTitle}>
          <Skeleton variant="circle" width="24px" height="24px" />
          <Skeleton variant="rect" width="200px" height="24px" />
        </CardTitle>
      </CardHeader>

      <CardContent className={shared.detailCardContent}>
        <div className={styles.questionList}>
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
          <QuestionCardSkeleton />
        </div>
      </CardContent>
    </>
  );
}

