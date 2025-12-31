import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import { Card, CardContent } from '@/components/Card';
import { Dialog, DialogTrigger, DialogContent } from '@/components/Dialog';
import {
  QuestionHeader,
  QuestionList,
  PostDetailError,
  PostHeader,
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
  } = useQuestionList(subjectId, { enabled: isQuestionListEnabled });

  if (subjectError) {
    return <PostDetailError />;
  }

  if (subjectLoading || questionListLoading) {
    return <div className={shared.pageFallback}>로딩 중...</div>;
  }

  return (
    <main>
      <PostHeader subject={subject} />
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
      <Dialog>
        <DialogTrigger>잠시 테스트중...</DialogTrigger>
        <DialogContent>
          <div>잠시 테스트중...</div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
