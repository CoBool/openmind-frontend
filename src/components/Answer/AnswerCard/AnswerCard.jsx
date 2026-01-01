import { useMemo, useState } from 'react';
import styles from './AnswerCard.module.css';
import Input from '@/components/common/Input/Input';
import Editmenu from '@/components/common/Editmenu/Editmenu';

import { createAnswer, patchAnswer, deleteAnswer } from '@/services/answersApi';

export default function AnswerCard({ question, onDeletePost }) {
  const initialAnswer = question?.answer ?? null;
  const initialMode = initialAnswer ? 'view' : 'write';

  const [mode, setMode] = useState(initialMode);
  const [answer, setAnswer] = useState(initialAnswer);
  const [draft, setDraft] = useState('');
  const [editDraft, setEditDraft] = useState(initialAnswer?.content ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => draft.trim().length > 0, [draft]);
  const canConfirmEdit = useMemo(
    () =>
      editDraft.trim().length > 0 &&
      editDraft.trim() !== (answer?.content ?? '').trim(),
    [editDraft, answer]
  );

  const handleSubmitAnswer = async () => {
    if (!canSubmit || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const created = await createAnswer(question.id, {
        content: draft.trim(),
        isRejected: false,
      });
      setAnswer(created);
      setMode('view');
    } catch {
      alert('답변 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmEdit = async () => {
    if (!answer || !canConfirmEdit || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const updated = await patchAnswer(answer.id, {
        content: editDraft.trim(),
      });
      setAnswer(updated);
      setMode('view');
    } catch {
      alert('답변 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.badge}>{answer ? '답변 완료' : '미답변'}</span>

        {answer && (
          <Editmenu onEdit={() => setMode('edit')} onDelete={onDeletePost} />
        )}
      </div>

      <div className={styles.questionTitle}>{question.content}</div>

      {mode === 'write' && (
        <>
          <Input
            as="textarea"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="답변을 입력해주세요"
          />
          <button onClick={handleSubmitAnswer}>답변 완료</button>
        </>
      )}

      {mode === 'view' && answer && (
        <div className={styles.answerText}>{answer.content}</div>
      )}

      {mode === 'edit' && (
        <>
          <Input
            as="textarea"
            value={editDraft}
            onChange={e => setEditDraft(e.target.value)}
          />
          <button onClick={handleConfirmEdit}>수정 완료</button>
          <button onClick={() => setMode('view')}>취소</button>
        </>
      )}
    </article>
  );
}
