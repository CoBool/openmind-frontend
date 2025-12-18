<<<<<<< HEAD
import { useParams } from 'react-router';
=======
import { useCallback, useState, useEffect } from 'react'
>>>>>>> a2c1f6f (feat: API 레이어 설계)

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

import { getSubjects } from '@/services/subjects_api'

export default function PostDetail() {
  const { subjectId } = useParams();

<<<<<<< HEAD
  const {
    subject,
    loading: subjectLoading,
    error: subjectError,
  } = useSubject(subjectId);
=======
  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await getSubjects()
      console.log(data)
    }
    fetchSubjects()
  }, [])

  const { ref, isFetching } = useInfiniteScroll(
    useCallback(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
>>>>>>> a2c1f6f (feat: API 레이어 설계)

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
