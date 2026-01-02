import { Card, CardHeader, CardDescription, CardFooter } from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import styles from './QuestionCardSkeleton.module.css';

export default function QuestionCardSkeleton() {
  return (
    <Card>
      <CardHeader className={styles.header}>
        <div className={styles.top}>
          <Skeleton
            variant="rect"
            width="70px"
            height="26px"
            className={styles.badge}
          />
        </div>

        <CardDescription className={styles.description}>
          <Skeleton
            variant="rect"
            width="100px"
            height="18px"
            className={styles.createdAt}
          />
          <Skeleton
            variant="rect"
            width="100%"
            height="24px"
            className={styles.questionLine1}
          />
          <Skeleton
            variant="rect"
            width="80%"
            height="24px"
            className={styles.questionLine2}
          />
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <div className={styles.reactions}>
          <div className={styles.reactionButton}>
            <Skeleton variant="circle" width="20px" height="20px" />
            <Skeleton variant="rect" width="60px" height="20px" />
          </div>
          <div className={styles.reactionButton}>
            <Skeleton variant="circle" width="20px" height="20px" />
            <Skeleton variant="rect" width="60px" height="20px" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

