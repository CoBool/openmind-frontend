import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/Card';

import styles from './UnauthorizedFallback.module.css';

function UnauthorizedFallback({
  title = '접근할 수 없는 페이지입니다',
  description = '이 피드는 작성자만 답변할 수 있어요.',
  action,
}) {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {action && (
        <CardContent>
          {action}
        </CardContent>
      )}
    </Card>
  );
}

export default UnauthorizedFallback;
