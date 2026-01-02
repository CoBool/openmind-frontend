import Container from '@/components/Container/Container';
import { Card } from '@/components/Card';
import PostHeaderSkeleton from '../PostHeaderSkeleton/PostHeaderSkeleton';
import QuestionListSkeleton from '../QuestionListSkeleton/QuestionListSkeleton';
import shared from '../../Post.shared.module.css';

export default function PostDetailSkeleton() {
  return (
    <main>
      <PostHeaderSkeleton />
      <Container>
        <Card className={shared.detailCard}>
          <QuestionListSkeleton />
        </Card>
      </Container>
    </main>
  );
}
