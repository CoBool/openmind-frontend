import { useParams } from 'react-router';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import Container from '@/components/Container/Container';
import { Card, CardContent } from '@/components/Card';
import {
  QuestionHeader,
  QuestionList,
  PostDetailError,
  PostHeader,
  CreateModal,
  PostDetailSkeleton,
} from './components';

import shared from './Post.shared.module.css';

export default function PostDetail() {
  const { subjectId } = useParams();

  const {
    subject,
    loading: subjectLoading,
    error: subjectError,
  } = useSubject(subjectId);

  const isQuestionListEnabled = !subjectLoading && !subjectError;

  const {
    questions,
    loading: questionListLoading,
    triggerRef,
    handleReaction,
    reactedQuestions,
    handleCreateQuestion,
  } = useQuestionList(subjectId, { enabled: isQuestionListEnabled });

  if (subjectError) {
    return <Container className={shared.unauthorizedContainer}><PostDetailError /></Container>;
  }

  if (subjectLoading || questionListLoading) {
    return <PostDetailSkeleton />;
  }

  if (subjectError) {
    return <PostDetailError />;
  }

  if (subjectLoading || questionListLoading) {
    return <div className={styles.pageFallback}>로딩 중...</div>;
  }

  return (
    <main>
      <PostHeader subject={subject} />
      <Container>
        <Card className={shared.detailCard}>
          <QuestionHeader questions={questions} />

          <CardContent className={shared.detailCardContent}>
            <QuestionList
              subject={subject}
              questions={questions}
              handleReaction={handleReaction}
              reactedQuestions={reactedQuestions}
              triggerRef={triggerRef}
            />
          </CardContent>
        </Card>
      </Container>
      <CreateModal subject={subject} onSuccess={handleCreateQuestion} />
    </main>
  );
}
