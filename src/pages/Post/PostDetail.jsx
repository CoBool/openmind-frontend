import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import Container from '@/components/Container/Container';
import { Card, CardContent } from '@/components/Card';
import FloatingButton from '@/components/Button/FloatingButton';
import QuestionModal from '@/components/Modal/QuestionModal';
import { createQuestion } from '@/services/questionsApi';
import {
  QuestionHeader,
  QuestionList,
  PostDetailError,
  PostHeader,
  CreateModal,
} from './components';

import shared from './Post.shared.module.css';

export default function PostDetail() {
  const { subjectId } = useParams();

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

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
    refetch,
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

      {/* ✅ 시안: 우측 하단 "질문 작성하기" 버튼 + 모달 */}
      <FloatingButton onClick={() => setIsQuestionModalOpen(true)} />
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onSuccess={async (content) => {
          await createQuestion(subjectId, { content });
          await refetch();
        }}
      />
    </main>
  );
}
