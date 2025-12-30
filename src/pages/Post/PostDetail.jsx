import { useParams } from 'react-router';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import { Avatar } from '@/components/Avatar';
import { Card, CardContent } from '@/components/Card';
import { ShareButtons } from '@/components/ShareButtons';
import { QuestionHeader, QuestionList, PostDetailError } from './components';

import styles from './Post.shared.module.css';

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
  } = useQuestionList(subjectId, { enabled: isQuestionListEnabled });

  if (subjectError) {
    return <PostDetailError />;
  }

  if (subjectLoading || questionListLoading) {
    return <div className={styles.pageFallback}>로딩 중...</div>;
  }

  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexDirection: 'column',
        }}
      >
        <Avatar>
          <Avatar.Image src={subject.imageSource} alt={subject.name} />
          <Avatar.Fallback>{subject.name}</Avatar.Fallback>
        </Avatar>
        <span>{subject.name}</span>
      </div>
      <ShareButtons
        url={window.location.href}
        title={`${subject.name}에게 무엇이든 물어보세요.`}
        description={`익명으로 질문하고, 답변을 확인해보세요.`}
        imageUrl={subject.imageSource}
      />
      <Card className={styles.detailCard}>
        <QuestionHeader questions={questions} />

        <CardContent className={styles.detailCardContent}>
          <QuestionList
            subject={subject}
            questions={questions}
            handleReaction={handleReaction}
            reactedQuestions={reactedQuestions}
            triggerRef={triggerRef}
          />
        </CardContent>
      </Card>
    </main>
  );
}
