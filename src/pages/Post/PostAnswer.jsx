import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import { useAuth } from '@/provider/AuthPrivder';
import Container from '@/components/Container/Container';
import { toast } from '@/components/Toast';
import { Card, CardContent } from '@/components/Card';
import {
  QuestionHeader,
  QuestionAnswerList,
  PostDetailError,
  PostHeader,
  UnauthorizedFallback,
  PostDetailSkeleton,
} from './components';
import Button from '@/components/Button/Button';

import shared from './Post.shared.module.css';
import styles from './PostAnswer.module.css';
export default function PostAnswer() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { currentUser, onLogout } = useAuth();

  const {
    subject,
    loading: subjectLoading,
    error: subjectError,
    handleDeleteSubject,
  } = useSubject(subjectId);

  const isOwner = Number(currentUser?.id) === Number(subject?.id);

  const isQuestionListEnabled = !subjectLoading && !subjectError;

  const handleGoToList = () => {
    navigate('/list');
  };

  const {
    questions,
    loading: questionListLoading,
    triggerRef,
    handleReaction,
    reactedQuestions,
    createAnswerForQuestion,
    deleteAnswerForQuestion,
  } = useQuestionList(subjectId, { enabled: isQuestionListEnabled });

  if (subjectError) {
    return (
      <Container className={shared.unauthorizedContainer}>
        <PostDetailError />
      </Container>
    );
  }

  if (subjectLoading || questionListLoading) {
    return <PostDetailSkeleton />;
  }

  if (!isOwner) {
    return (
      <Container className={shared.unauthorizedContainer}>
        <UnauthorizedFallback
          action={<Button onClick={handleGoToList}>목록으로 돌아가기</Button>}
        />
      </Container>
    );
  }

  const handleDelete = async () => {
    try {
      await handleDeleteSubject();
      toast({
        title: '주제가 삭제되었습니다',
        description: '주제가 삭제되었습니다',
      });
      onLogout();
      navigate('/list', { replace: true });
    } catch (error) {
      console.error('Failed to delete subject:', error);
      toast({
        title: '주제 삭제에 실패했습니다',
        description: '주제 삭제에 실패했습니다',
      });
    }
  };

  return (
    <main>
      <PostHeader subject={subject} />
      <Container>
        <div className={styles.deleteButtonContainer}>
          <Button className={styles.deleteButton} onClick={handleDelete}>
            삭제하기
          </Button>
        </div>

        <Card className={shared.detailCard}>
          <QuestionHeader questions={questions} />
          <CardContent className={shared.detailCardContent}>
            <QuestionAnswerList
              subject={subject}
              questions={questions}
              handleReaction={handleReaction}
              reactedQuestions={reactedQuestions}
              triggerRef={triggerRef}
              createAnswerForQuestion={createAnswerForQuestion}
              deleteAnswerForQuestion={deleteAnswerForQuestion}
            />
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
