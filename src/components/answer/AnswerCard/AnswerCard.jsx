// src/components/answer/AnswerCard/AnswerCard.jsx
import { useMemo, useState } from 'react';
import styles from './AnswerCard.module.css';

import Editmenu from '@/components/common/Editmenu/Editmenu';
import { createAnswer, patchAnswer, deleteAnswer } from '@/services/answersApi';

export default function AnswerCard({ question, onDeletePost }) {
  // question.answer가 있으면 view, 없으면 write
  const initialAnswer = question?.answer ?? null;
  const initialMode = initialAnswer ? 'view' : 'write';

  const [mode, setMode] = useState(initialMode);

  const [answer, setAnswer] = useState(initialAnswer);

  const [draft, setDraft] = useState(''); // write 모드 입력값
  const [editDraft, setEditDraft] = useState(initialAnswer?.content ?? ''); // edit 모드 입력값
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => draft.trim().length > 0, [draft]);
  const canConfirmEdit = useMemo(() => editDraft.trim().length > 0, [editDraft]);

  const handleChangeDraft = (e) => setDraft(e.target.value);
  const handleChangeEditDraft = (e) => setEditDraft(e.target.value);

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
    } catch (e) {
      console.error(e);
      alert('답변 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEdit = () => {
    if (!answer) return;
    setEditDraft(answer.content ?? '');
    setMode('edit');
  };

  const handleCancelEdit = () => {
    // 수정 취소하면 원래 답변으로 복구
    setEditDraft(answer?.content ?? '');
    setMode('view');
  };

  const handleConfirmEdit = async () => {
    if (!answer) return;
    if (!canConfirmEdit || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const updated = await patchAnswer(answer.id, {
        content: editDraft.trim(),
      });

      setAnswer(updated);
      setMode('view'); // ✅ 수정 완료 누르면 답변완료 상태로 돌아가 텍스트 표시
    } catch (e) {
      console.error(e);
      alert('답변 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ 요구사항 확정: "삭제하기" = 포스트 단위 삭제
  const handleDeletePost = () => {
    onDeletePost?.();
  };

  // (선택) 만약 팀에서 "답변 삭제"도 필요하면 이걸 케밥에 연결하면 됨
  const handleDeleteAnswer = async () => {
    if (!answer) return;

    try {
      setIsSubmitting(true);
      await deleteAnswer(answer.id);
      setAnswer(null);
      setDraft('');
      setMode('write');
    } catch (e) {
      console.error(e);
      alert('답변 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.badge}>{answer ? '답변 완료' : '미답변'}</span>

        {/* 케밥 메뉴는 답변이 있을 때만 노출하는 게 자연스럽다 */}
        {answer && (
          <Editmenu
            onEdit={handleOpenEdit}
            onDelete={handleDeletePost} // ✅ 포스트 단위 삭제
            // onDelete={handleDeleteAnswer} // (옵션) 답변 삭제로 바꾸려면 이걸로
          />
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.questionTitle}>{question?.content}</div>
      </div>

      {/* ✅ write 모드: 답변 작성 */}
      {mode === 'write' && (
        <>
          <textarea
            className={styles.textarea}
            placeholder="답변을 입력해주세요"
            value={draft}
            onChange={handleChangeDraft}
          />
          <button
            className={styles.primaryButton}
            type="button"
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmitAnswer}
          >
            답변 완료
          </button>
        </>
      )}

      {/* ✅ view 모드: 답변 텍스트 표시 */}
      {mode === 'view' && answer && (
        <div className={styles.answerText}>
          {answer.content}
        </div>
      )}

      {/* ✅ edit 모드: 수정중 */}
      {mode === 'edit' && (
        <>
          <textarea
            className={styles.textarea}
            placeholder="답변을 입력해주세요"
            value={editDraft}
            onChange={handleChangeEditDraft}
          />
          <button
            className={styles.primaryButton}
            type="button"
            disabled={!canConfirmEdit || isSubmitting}
            onClick={handleConfirmEdit}
          >
            수정 완료
          </button>

          <button
            className={styles.secondaryButton}
            type="button"
            disabled={isSubmitting}
            onClick={handleCancelEdit}
          >
            취소
          </button>
        </>
      )}
    </article>
  );
}
