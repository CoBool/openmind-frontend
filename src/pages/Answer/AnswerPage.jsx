import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Card } from '../../components/Card/Card'
import Editmenu from '../../components/Editmenu/Editmenu'
import UserCard from '../../components/UserCard/UserCard'

import { getSubject, deleteSubject } from '../../services/subjectsApi'
import { getSubjectQuestions } from '../../services/questionsApi'
import { createAnswer, updateAnswer } from '../../services/answersApi'

import styles from './AnswerPage.module.css'

function AnswerPage() {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const [subject, setSubject] = useState(null)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // editing state per question
  const [editingQuestionId, setEditingQuestionId] = useState(null)
  const [draftByQuestionId, setDraftByQuestionId] = useState({})
  const [isDeletingPost, setIsDeletingPost] = useState(false)

  const questionCountText = useMemo(() => {
    const count = subject?.questionCount ?? questions.length
    return `${count}개의 질문이 있습니다`
  }, [subject?.questionCount, questions.length])

  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [subjectData, questionsData] = await Promise.all([
          getSubject(subjectId),
          getSubjectQuestions(subjectId, { limit: 10, offset: 0 }),
        ])
        if (isCancelled) return
        setSubject(subjectData)
        setQuestions(questionsData?.results ?? [])
      } catch (e) {
        if (isCancelled) return
        setError(e?.message ?? '데이터를 불러오지 못했습니다.')
      } finally {
        if (!isCancelled) setIsLoading(false)
      }
    }

    fetchData()
    return () => {
      isCancelled = true
    }
  }, [subjectId])

  const setDraft = (questionId, value) => {
    setDraftByQuestionId(prev => ({ ...prev, [questionId]: value }))
  }

  const openEdit = question => {
    setEditingQuestionId(question.id)
    setDraft(question.id, question?.answer?.content ?? '')
  }

  const cancelEdit = () => {
    setEditingQuestionId(null)
  }

  const handleCreateAnswer = async question => {
    const content = (draftByQuestionId[question.id] ?? '').trim()
    if (!content) return

    try {
      const created = await createAnswer(question.id, { content })
      // API 응답에 따라 answer 형태가 다를 수 있어 안전하게 처리
      const nextAnswer = created?.answer ?? created ?? { content }
      setQuestions(prev =>
        prev.map(q => (q.id === question.id ? { ...q, answer: nextAnswer } : q)),
      )
      setEditingQuestionId(null)
    } catch (e) {
      alert(e?.message ?? '답변 등록에 실패했습니다.')
    }
  }

  const handleUpdateAnswer = async question => {
    const content = (draftByQuestionId[question.id] ?? '').trim()
    if (!content) return

    const answerId = question?.answer?.id
    if (!answerId) {
      // answerId가 없으면 create로 폴백
      await handleCreateAnswer(question)
      return
    }

    try {
      const updated = await updateAnswer(answerId, { content })
      const nextAnswer = updated?.answer ?? updated ?? { ...question.answer, content }
      setQuestions(prev =>
        prev.map(q => (q.id === question.id ? { ...q, answer: nextAnswer } : q)),
      )
      setEditingQuestionId(null)
    } catch (e) {
      alert(e?.message ?? '답변 수정에 실패했습니다.')
    }
  }

  const handleDeletePost = async () => {
    if (isDeletingPost) return
    const ok = window.confirm('이 피드를 삭제할까요? (포스트 단위 삭제)')
    if (!ok) return

    try {
      setIsDeletingPost(true)
      await deleteSubject(subjectId)
      navigate('/', { replace: true })
    } catch (e) {
      alert(e?.message ?? '삭제에 실패했습니다.')
    } finally {
      setIsDeletingPost(false)
    }
  }

  if (isLoading) {
    return <div className={styles.pageFallback}>로딩 중...</div>
  }

  if (error) {
    return <div className={styles.pageFallback}>에러: {error}</div>
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <UserCard
          profileImageUrl={subject?.imageSource}
          name={subject?.name}
          questionCount={subject?.questionCount}
        />

        <Link className={styles.askButton} to={`/post/${subjectId}`}>
          질문하러 가기 →
        </Link>
      </header>

      <div className={styles.countRow}>
        <span className={styles.countText}>{questionCountText}</span>
      </div>

      <main className={styles.list}>
        {questions.map(question => {
          const hasAnswer = Boolean(question?.answer?.content)
          const isEditing = editingQuestionId === question.id

          const draft = draftByQuestionId[question.id] ?? (hasAnswer ? question.answer.content : '')

          const isDraftEmpty = !draft.trim()

          return (
            <Card key={question.id}>
              <div className={styles.cardTopRow}>
                <span className={[styles.badge, hasAnswer ? styles.badgeDone : styles.badgeTodo].join(' ')}>
                  {hasAnswer ? '답변 완료' : '미답변'}
                </span>

                <Editmenu
                  onEdit={() => openEdit(question)}
                  onDelete={handleDeletePost}
                  // 수정은 답변이 있는 경우에만 의미가 있으니 UI에서만 비활성 느낌
                  isEditDisabled={!hasAnswer}
                />
              </div>

              <div className={styles.questionBlock}>
                <div className={styles.questionMeta}>질문 · {question?.createdAt?.slice(0, 10) ?? ''}</div>
                <div className={styles.questionTitle}>{question?.content}</div>
              </div>

              <div className={styles.answerBlock}>
                <div className={styles.answerAuthorRow}>
                  <img className={styles.avatar} src={subject?.imageSource} alt="" />
                  <div className={styles.answerAuthorName}>{subject?.name}</div>
                </div>

                {!hasAnswer && !isEditing && (
                  <>
                    <textarea
                      className={styles.textarea}
                      placeholder="답변을 입력해주세요"
                      value={draftByQuestionId[question.id] ?? ''}
                      onChange={e => setDraft(question.id, e.target.value)}
                    />
                    <button
                      type="button"
                      className={[styles.primaryButton, isDraftEmpty && styles.disabled].filter(Boolean).join(' ')}
                      disabled={isDraftEmpty}
                      onClick={() => handleCreateAnswer(question)}
                    >
                      답변 완료
                    </button>
                  </>
                )}

                {hasAnswer && !isEditing && (
                  <div className={styles.answerText}>{question.answer.content}</div>
                )}

                {isEditing && (
                  <>
                    <textarea
                      className={styles.textarea}
                      placeholder="답변을 입력해주세요"
                      value={draft}
                      onChange={e => setDraft(question.id, e.target.value)}
                    />
                    <button
                      type="button"
                      className={[styles.primaryButton, isDraftEmpty && styles.disabled].filter(Boolean).join(' ')}
                      disabled={isDraftEmpty}
                      onClick={() => handleUpdateAnswer(question)}
                    >
                      수정 완료
                    </button>
                    <button type="button" className={styles.secondaryButton} onClick={cancelEdit}>
                      취소
                    </button>
                  </>
                )}
              </div>

              <div className={styles.reactionRow}>
                <button type="button" className={styles.reactionBtn}>
                  좋아요 {question.like ?? 0}
                </button>
                <button type="button" className={styles.reactionBtn}>
                  싫어요 {question.dislike ?? 0}
                </button>
              </div>
            </Card>
          )
        })}
      </main>
    </div>
  )
}

export default AnswerPage
