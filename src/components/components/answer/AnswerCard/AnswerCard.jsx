import { useEffect, useMemo, useState } from 'react';

import styles from './AnswerCard.module.css';

import Editmenu from '@/components/Editmenu/Editmenu';
import { formatTimeAgo } from '@/utils/date';
import { createAnswer, updateAnswer } from '@/services/answersApi';

/**
 * @param {{
 *  question: any,
 *  subjectId: string | number,
 *  onUpdateAnswer?: (questionId: number, nextAnswer: any|null) => void,
 *  onDeletePost?: () => void,
 * }} props
 */
export default function AnswerCard({ question, onUpdateAnswer, onDeletePost }) {
  const existingAnswer = question?.answer ?? null;

  // mode: 'write' (미답변), 'view' (답변완료), 'edit' (수정중)
  const initialMode = existingAnswer ? 'view' : 'write';
  const [mode, setMode] = useState(initialMode);
  const [draft, setDraft] = useState(existingAnswer?.content ?? '');
  const [answer, setAnswer] = useState(existingAnswer);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // props question 업데이트(리패치) 시 로컬 상태 동기화
  useEffect(() => {
    const nextAnswer = question?.answer ?? null;
    setAnswer(nextAnswer);
    setDraft(nextAnswer?.content ?? '');
    setMode(nextAnswer ? 'view' : 'write');
  }, [question?.answer]);

  const badgeText = answer ? '답변 완료' : '미답변';
  const questionTime = useMemo(() => {
    const createdAt = question?.createdAt;
    return createdAt ? formatTimeAgo(createdAt) : '';
  }, [question?.createdAt]);

  const canSubmitWrite = mode === 'write' && draft.trim().length > 0 && !isSubmitting;
  const canSubmitEdit = mode === 'edit' && draft.trim().length > 0 && !isSubmitting;

  const handleWrite = async () => {
    if (!canSubmitWrite) return;

    try {
      setIsSubmitting(true);
      const created = await createAnswer(question.id, {
        content: draft.trim(),
        isRejected: false,
      });
      setAnswer(created);
      setMode('view');
      onUpdateAnswer?.(question.id, created);
    } catch (e) {
      console.error(e);
      alert('답변 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEdit = () => {
    if (!answer) return;
    setDraft(answer.content ?? '');
    setMode('edit');
  };

  const handleEditDone = async () => {
    if (!answer || !canSubmitEdit) return;

    try {
      setIsSubmitting(true);
      const updated = await updateAnswer(answer.id, {
        content: draft.trim(),
        isRejected: false,
      });
      setAnswer(updated);
      setMode('view');
      onUpdateAnswer?.(question.id, updated);
    } catch (e) {
      console.error(e);
      alert('답변 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 요구사항: 삭제하기 = 포스트(피드) 단위 삭제
  const handleDeletePost = () => {
    if (!onDeletePost) return;
    const ok = confirm('이 포스트를 삭제할까요?');
    if (!ok) return;
    onDeletePost();
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.badge}>{badgeText}</span>

        {answer && (
          <Editmenu onEdit={handleOpenEdit} onDelete={handleDeletePost} />
        )}
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>질문 · {questionTime}</span>
      </div>

      <h3 className={styles.title}>{question?.content}</h3>

      <div className={styles.answerBox}>
        <div className={styles.authorRow}>
          <img
            className={styles.avatar}
            src={question?.subject?.imageSource || question?.subject?.imageSourceUrl || question?.subject?.image || ''}
            alt=""
          />
          <span className={styles.name}>{question?.subject?.name || ''}</span>
        </div>

        {mode === 'view' && (
          <p className={styles.answerText}>{answer?.content}</p>
        )}

        {mode !== 'view' && (
          <textarea
            className={styles.textarea}
            placeholder="답변을 입력해주세요"
            value={draft}
            onChange={e => setDraft(e.target.value)}
          />
        )}

        {mode === 'write' && (
          <button
            type="button"
            className={canSubmitWrite ? styles.primaryBtn : styles.disabledBtn}
            disabled={!canSubmitWrite}
            onClick={handleWrite}
          >
            답변 완료
          </button>
        )}

        {mode === 'edit' && (
          <button
            type="button"
            className={canSubmitEdit ? styles.primaryBtn : styles.disabledBtn}
            disabled={!canSubmitEdit}
            onClick={handleEditDone}
          >
            수정 완료
          </button>
        )}
      </div>

      <div className={styles.footerRow}>
        <button type="button" className={styles.reactionBtn}>
          👍 좋아요 {question?.like || 0}
        </button>
        <button type="button" className={styles.reactionBtn}>
          👎 싫어요 {question?.dislike || 0}
        </button>
      </div>
    </article>
  );
}
