import { useCallback, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { getSubject } from '@/services/subjectsApi';
import { getSubjectQuestions, reactToQuestion } from '@/services/questionsApi';

import { Card, CardContent } from '@/components/Card';

import { QuestionHeader, QuestionCard, QuestionEmpty } from './components';
import styles from './Post.shared.module.css';

const TRIGGER_POINT = 2;

export default function PostDetail() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState({});
  const [questions, setQuestions] = useState({});
  const [offset, setOffset] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const reactionLoding = useRef(false);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubject(subjectId);
        setSubject(data);
      } catch {
        setError(true);
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
        setError(true);
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
      const data = await getSubjectQuestions(subjectId, { offset: offset });

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

  const { ref } = useInfiniteScroll(fetchMoreQuestions);

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

  if (error) {
    navigate('/');
    return null;
  }

  const isEmpty = questions?.results?.length === 0;

  return (
    <main>
      <Card className={styles.detailCard}>
        <QuestionHeader questions={questions} />

        <CardContent className={styles.detailCardContent}>
          {isEmpty ? (
            <QuestionEmpty />
          ) : (
            questions &&
            questions.results?.map((question, index) => {
              const isTriggerPoint =
                index === questions.results.length - TRIGGER_POINT;

              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onReaction={handleReaction}
                  ref={isTriggerPoint ? ref : null}
                />
              );
            })
          )}
        </CardContent>
      </Card>
    </main>
  );
}
