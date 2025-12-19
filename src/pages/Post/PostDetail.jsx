import { useCallback, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { getSubject } from '@/services/subjectsApi';
import { getSubjectQuestions, reactToQuestion } from '@/services/questionsApi';
import { getTimeAgo } from '@/utils/date';

export default function PostDetail() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState({});
  const [questions, setQuestions] = useState({});
  const [offset, setOffset] = useState(null);

  const reactionLoding = useRef(false);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubject(subjectId);
        setSubject(data);
      } catch {
        console.error('404 Not Found');
      }
    };
    const fetchQuestions = async () => {
      try {
        const data = await getSubjectQuestions(subjectId);
        setQuestions(data);

        const url = data.next;

        if (url !== null) {
          const nextOffset = new URL(url).searchParams.get('offset');
          setOffset(nextOffset);
        } else {
          setOffset(null);
        }
      } catch {
        console.error('404 Not Found');
      }
    };
    fetchSubject();
    fetchQuestions();
  }, [subjectId]);

  const fetchMoreQuestions = useCallback(async () => {
    if (offset === null || offset === '0' || offset === 0) {
      return;
    }

    try {
      const data = await getSubjectQuestions(subjectId, {
        offset: offset,
      });

      setQuestions(prev => ({
        ...prev,
        results: [...prev.results, ...data.results],
      }));

      const url = data.next;

      if (url !== null) {
        const nextOffset = new URL(url).searchParams.get('offset');
        setOffset(nextOffset);
      } else {
        setOffset(null);
      }
    } catch {
      console.error('404 Not Found');
    }
  }, [subjectId, offset]);

  const { ref, isFetching } = useInfiniteScroll(fetchMoreQuestions);

  const handleReaction = async (questionId, reactionType) => {
    // 1. 중복 클릭 방지
    if (reactionLoding.current) return;
    reactionLoding.current = true;

    // 2. 롤백을 위해 이전 상태 저장 (Snapshot)
    const previousQuestions = questions;

    // 3. 낙관적 업데이트 (화면 먼저 변경)
    setQuestions(prev => ({
      ...prev,
      results: prev.results.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            [reactionType]: question[reactionType] + 1,
          };
        }
        return question;
      }),
    }));

    try {
      await reactToQuestion(questionId, {
        type: reactionType,
      });
    } catch (error) {
      console.error('Failed to react to question:', error);
      setQuestions(previousQuestions);
    } finally {
      reactionLoding.current = false;
    }
  };

  return (
    <main>
      <article>
        <h1>Post Detail</h1>
      </article>
      <section style={{ overflow: 'hidden' }}>
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
    </main>
  );
}
