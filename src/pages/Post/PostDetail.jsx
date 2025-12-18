<<<<<<< HEAD
<<<<<<< HEAD
import { useParams } from 'react-router';
=======
import { useCallback, useState, useEffect } from 'react'
>>>>>>> a2c1f6f (feat: API 레이어 설계)
=======
import { useCallback, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
>>>>>>> 10f0ce7 (refactor: PostDetail 컴포넌트 업데이트, 질문이 더 있는 경우 무한스크롤을 이용하여 추가질문 받아도는 로직추가)

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

import { getSubject } from '@/services/subjectsApi'
import { getSubjectQuestions, reactToQuestion } from '@/services/questionsApi'
import { getTimeAgo } from '@/utils/date'

export default function PostDetail() {
<<<<<<< HEAD
  const { subjectId } = useParams();
=======
  const { subjectId } = useParams()
  const [subject, setSubject] = useState({})
  const [questions, setQuestions] = useState({})
  const [offset, setOffset] = useState(null)

  const reactionLoding = useRef(false)
>>>>>>> 10f0ce7 (refactor: PostDetail 컴포넌트 업데이트, 질문이 더 있는 경우 무한스크롤을 이용하여 추가질문 받아도는 로직추가)

<<<<<<< HEAD
  const {
    subject,
    loading: subjectLoading,
    error: subjectError,
  } = useSubject(subjectId);
=======
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubject(subjectId)
        setSubject(data)
      } catch {
        console.error('404 Not Found')
      }
    }
    const fetchQuestions = async () => {
      try {
        const data = await getSubjectQuestions(subjectId)
        setQuestions(data)

<<<<<<< HEAD
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
=======
        console.log(data)

        const url = data.next

        if (url !== null) {
          const nextOffset = new URL(url).searchParams.get('offset')
          setOffset(nextOffset)
        } else {
          setOffset(null)
        }
      } catch {
        console.error('404 Not Found')
      }
    }
    fetchSubject()
    fetchQuestions()
  }, [subjectId])

  const fetchMoreQuestions = useCallback(async () => {
    if (offset === 0 || offset === null) return

    try {
      const data = await getSubjectQuestions(subjectId, {
        offset: offset,
      })
      setQuestions(prev => ({
        ...prev,
        results: [...prev.results, ...data.results],
      }))

      const url = data.next

      if (url !== null) {
        const nextOffset = new URL(url).searchParams.get('offset')
        setOffset(nextOffset)
      } else {
        setOffset(null)
      }
    } catch {
      console.error('404 Not Found')
    }
  }, [subjectId, offset])

  const { ref, isFetching } = useInfiniteScroll(fetchMoreQuestions)

  const handleReaction = async (questionId, reactionType) => {
    // 1. 중복 클릭 방지
    if (reactionLoding.current) return
    reactionLoding.current = true

    // 2. 롤백을 위해 이전 상태 저장 (Snapshot)
    const previousQuestions = questions

    // 3. 낙관적 업데이트 (화면 먼저 변경)
    setQuestions(prev => ({
      ...prev,
      results: prev.results.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            [reactionType]: question[reactionType] + 1,
          }
        }
        return question
      }),
    }))

    try {
      await reactToQuestion(questionId, {
        type: reactionType,
      })
    } catch (error) {
      console.error('Failed to react to question:', error)
      setQuestions(previousQuestions)
    } finally {
      reactionLoding.current = false
    }
>>>>>>> 10f0ce7 (refactor: PostDetail 컴포넌트 업데이트, 질문이 더 있는 경우 무한스크롤을 이용하여 추가질문 받아도는 로직추가)
  }

  return (
    <main>
<<<<<<< HEAD
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
=======
      <article>
        <h1>Post Detail</h1>
      </article>
      <section>
        <div>
          <p>질문 받는 사람 정보</p>
          <p>
            썸네일
            <img src={subject.imageSource} alt={subject.name} />
          </p>
          <p>이름 : {subject.name}</p>
        </div>
        <p>{questions.count}개의 질문이 있습니다</p>
        {questions &&
          questions.results?.map(question => (
            <div
              key={question.id}
              style={{
                marginBottom: '20px',
                border: '1px solid #000',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#f0f0f0',
              }}
            >
              <div>답변 여부 : {question.answer ? '답변 완료' : '미답변'}</div>
              <div>질문 ID : {question.id}</div>
              <div>
                <p>질문 내용 : {question.content}</p>
                {question.answer && (
                  <div>
                    <p>
                      사진 <img src={subject.imageSource} alt={subject.name} />
                    </p>
                    <p>이름 : {subject.name}</p>
                    <p>답변 시간 : {getTimeAgo(question.answer?.createdAt)}</p>
                    <p>
                      답변 내용 :{' '}
                      {question.answer?.isRejected
                        ? '답변 거절'
                        : question.answer?.content}
                    </p>
                  </div>
                )}
              </div>
              <div>
                좋아요 수 : {question.like}
                <button onClick={() => handleReaction(question.id, 'like')}>
                  👍 좋아요
                </button>
              </div>
              <div>
                싫어요 수 : {question.dislike}
                <button onClick={() => handleReaction(question.id, 'dislike')}>
                  👎 싫어요
                </button>
              </div>
              <div>생성 시간 : {getTimeAgo(question.createdAt)}</div>
            </div>
          ))}

        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              border: '1px solid #000',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
              marginBottom: '20px',
              marginTop: '20px',
            }}
            ref={ref}
          >
            {offset === null ? '여기가 마지막 질문이에요!' : '더보기'}
          </div>
        )}
      </section>
>>>>>>> 10f0ce7 (refactor: PostDetail 컴포넌트 업데이트, 질문이 더 있는 경우 무한스크롤을 이용하여 추가질문 받아도는 로직추가)
    </main>
  );
}
