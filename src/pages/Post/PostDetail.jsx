import { useParams } from 'react-router';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

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
      <ShareButtons
        url={window.location.href}
        title={subject.title}
        description={subject.description}
        imageUrl={subject.imageUrl}
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
