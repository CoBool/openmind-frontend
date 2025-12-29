import { QuestionCard, QuestionEmpty, QuestionAnswer } from '../';

const TRIGGER_POINT = 2;

export default function QuestionList({
  subject,
  questions,
  handleReaction,
  triggerRef,
  reactedQuestions,
}) {
  const isEmpty = !questions?.results || questions.results.length === 0;

  if (isEmpty) {
    return <QuestionEmpty />;
  }

  return (
    <>
      {questions.results.map((question, index) => {
        // 뒤에서 2번째 요소인지 체크
        const isTriggerPoint =
          index === questions.results.length - TRIGGER_POINT;

        const reaction = reactedQuestions.get(question.id);

        return (
          <QuestionCard
            key={question.id}
            question={question}
            onReaction={handleReaction}
            // 트리거 포인트에만 ref 연결
            ref={isTriggerPoint ? triggerRef : null}
            reaction={reaction}
          >
            {question.answer && (
              <QuestionAnswer answer={question.answer} subject={subject} />
            )}
          </QuestionCard>
        );
      })}
    </>
  );
}
