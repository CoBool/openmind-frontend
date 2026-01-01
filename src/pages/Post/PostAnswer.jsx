import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import { useAuth } from '@/provider/AuthPrivder';
import Container from '@/components/Container/Container';
import { Card, CardContent } from '@/components/Card';
import {
  QuestionHeader,
  QuestionList,
  PostDetailError,
  PostHeader,
  UnauthorizedFallback,
} from './components';
import Button from '@/components/Button/Button';

import shared from './Post.shared.module.css';

export default function PostAnswer() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { currentUser } = useAuth();

  const {
    subject,
    loading: subjectLoading,
    error: subjectError,
  } = useSubject(subjectId);

  const isOwner = Number(currentUser?.id) === Number(subject?.id);

  const isQuestionListEnabled = !subjectLoading && !subjectError;

  const handleGoToList = () => {
    navigate('/list');
  }

  const {
    questions,
    loading: questionListLoading,
    triggerRef,
    handleReaction,
    reactedQuestions,
  } = useQuestionList(subjectId, { enabled: isQuestionListEnabled });

  if (subjectError) {
    return <PostDetailError />;
  }  

  if (subjectLoading || questionListLoading) {
    return <div className={shared.pageFallback}>로딩 중...</div>;
  }

  if (!isOwner) {
    return <Container className={shared.unauthorizedContainer}><UnauthorizedFallback action={<Button onClick={handleGoToList}>목록으로 돌아가기</Button>}/></Container>;
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
    </main>
  );
}
