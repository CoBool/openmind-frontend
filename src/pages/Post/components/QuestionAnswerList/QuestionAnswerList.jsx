import { useState } from 'react';
import { toast } from '@/components/Toast';

import {
  QuestionCard,
  QuestionEmpty,
  QuestionAnswer,
  AnswerInputForm,
} from '../';

import MoreMenu from './Moremenu';

const TRIGGER_POINT = 2;

export default function QuestionAnswerList({
  subject,
  questions,
  handleReaction,
  triggerRef,
  reactedQuestions,
  createAnswerForQuestion,
  updateAnswerForQuestion,
  deleteAnswerForQuestion,
}) {
  const isEmpty = !questions?.results || questions.results.length === 0;
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  if (isEmpty) {
    return <QuestionEmpty />;
  }

  const handleRejectAnswer = async questionId => {
    try {
      await createAnswerForQuestion(questionId, {
        content: '거절된 답변입니다.',
        isRejected: true,
      });
      toast({ title: '답변이 거절되었습니다' });
    } catch (error) {
      toast({ title: '답변 거절에 실패했습니다' });
    }
  };

  const handleUpdateSubmit = async (questionId, payload) => {
    try {
      await updateAnswerForQuestion(questionId, payload);
      setEditingQuestionId(null);
      toast({ title: '답변이 수정되었습니다' });
    } catch {
      toast({ title: '수정에 실패했습니다' });
    }
  };

  const handleDeleteAnswer = async questionId => {
    try {
      await deleteAnswerForQuestion(questionId);
      toast({ title: '답변이 삭제되었습니다' });
    } catch {
      toast({ title: '답변 삭제에 실패했습니다' });
    }
  };

  return (
    <>
      {questions.results.map((question, index) => {
        const isTriggerPoint =
          index === questions.results.length - TRIGGER_POINT;

        const reaction = reactedQuestions.get(question.id);
        const isEditing = editingQuestionId === question.id;
        const isAnswered = question.answer !== null;

        return (
          <QuestionCard
            key={question.id}
            question={question}
            onReaction={handleReaction}
            ref={isTriggerPoint ? triggerRef : null}
            reaction={reaction}
            actionSlot={
              <MoreMenu
                isAnswered={isAnswered}
                onReject={() => handleRejectAnswer(question.id)}
                onEdit={() => setEditingQuestionId(question.id)}
                onDelete={() => handleDeleteAnswer(question.id)}
              />
            }
          >
            {isEditing ? (
              <AnswerInputForm
                questionId={question.id}
                initialContent={question.answer?.content || ''}
                onSubmit={handleUpdateSubmit}
              />
            ) : isAnswered ? (
              <QuestionAnswer answer={question.answer} subject={subject} />
            ) : (
              <AnswerInputForm
                questionId={question.id}
                onSubmit={createAnswerForQuestion}
              />
            )}
          </QuestionCard>
        );
      })}
    </>
  );
}
