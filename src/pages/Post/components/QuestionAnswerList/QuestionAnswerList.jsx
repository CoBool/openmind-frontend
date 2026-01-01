import { useState } from 'react';
import Button from '@/components/Button/Button';

import { toast } from '@/components/Toast';

import {
  QuestionCard,
  QuestionEmpty,
  QuestionAnswer,
  AnswerInputForm,
} from '../';

const TRIGGER_POINT = 2;

function AnswerActionSlot({ actions }) {
  return (
    <div>
      {actions.map(
        action =>
          action.visible && (
            <Button key={action.key} onClick={action.onClick}>
              {action.label}
            </Button>
          )
      )}
    </div>
  );
}

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
      toast({
        title: '답변이 거절되었습니다',
      });
    } catch (error) {
      console.error('Failed to reject answer:', error);
      toast({
        title: '답변 거절에 실패했습니다',
      });
    }
  };

  const handleUpdateSubmit = async (questionId, { content, isRejected }) => {
    try {
        await updateAnswerForQuestion(questionId, { content, isRejected });
        
        setEditingQuestionId(null); 
        
        toast({ title: '답변이 수정되었습니다' });
    } catch (error) {
        console.error(error);
        toast({ title: '수정에 실패했습니다' });
    }
};

  const handleDeleteAnswer = async questionId => {
    try {
      await deleteAnswerForQuestion(questionId);
      toast({
        title: '답변이 삭제되었습니다',
      });
    } catch (error) {
      console.error('Failed to delete answer:', error);
      toast({
        title: '답변 삭제에 실패했습니다',
      });
    }
  };

  return (
    <>
      {questions.results.map((question, index) => {
        // 뒤에서 2번째 요소인지 체크
        const isTriggerPoint =
          index === questions.results.length - TRIGGER_POINT;

        const reaction = reactedQuestions.get(question.id);

        const isEditing = editingQuestionId === question.id;
        const isAnswered = question.answer !== null;

        const actions = [
          {
            visible: question.answer === null,
            key: 'reject',
            label: '거절',
            onClick: () => handleRejectAnswer(question.id),
          },
          {
            visible: question.answer,
            key: 'update',
            label: '수정',
            onClick: () => setEditingQuestionId(question.id),
          },
          {
            visible: true,
            key: 'delete',
            label: '삭제',
            onClick: () => handleDeleteAnswer(question.id),
          },
        ];

        return (
          <QuestionCard
            key={question.id}
            question={question}
            onReaction={handleReaction}
            // 트리거 포인트에만 ref 연결
            ref={isTriggerPoint ? triggerRef : null}
            reaction={reaction}
            actionSlot={<AnswerActionSlot actions={actions} />}
          >
            {(() => {
              if (isEditing) {
                return (
                  <AnswerInputForm
                    questionId={question.id}
                    initialContent={question.answer?.content || ''}
                    onSubmit={handleUpdateSubmit}
                  />
                );
              }
              if (isAnswered) {
                return (
                  <QuestionAnswer answer={question.answer} subject={subject} />
                );
              }
              return (
                <AnswerInputForm
                  questionId={question.id}
                  onSubmit={createAnswerForQuestion}
                />
              );
            })()}
          </QuestionCard>
        );
      })}
    </>
  );
}
