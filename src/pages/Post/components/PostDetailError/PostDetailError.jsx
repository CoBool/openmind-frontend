import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/Card';

import Button from '@/components/Button/Button';

import styles from './PostDetailError.module.css';

export default function PostDetailError() {
  const navigate = useNavigate();

  const handleGoToList = () => {
    navigate('/list');
  }

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>오류가 발생했습니다</CardTitle>
        <CardDescription>오류가 발생했습니다. 다시 시도해주세요.</CardDescription>
      </CardHeader>

      <CardContent>
        <Button onClick={handleGoToList}>목록으로 돌아가기</Button>
      </CardContent>
    </Card>
  );
}
