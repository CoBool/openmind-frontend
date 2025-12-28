import { useState, useEffect, useCallback, useRef } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { getSubjectQuestions, reactToQuestion } from '@/services/questionsApi';

/**
 * @description URL에서 offset 파라미터를 추출합니다.
 * @param {string} url - 조회할 URL
 * @returns {string|null} offset 파라미터 값
 */
const getNextOffset = url => {
  if (!url) return null;
  return new URL(url).searchParams.get('offset');
};

export const useQuestionList = (subjectId, options = {}) => {
  const { enabled = false } = options;

  const [questions, setQuestions] = useState({});
  const [offset, setOffset] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const reactionLoading = useRef(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getSubjectQuestions(subjectId);
        setQuestions(data);
        setOffset(getNextOffset(data?.next));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (subjectId && enabled) {
      fetchQuestions();
    } else if (!enabled) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [subjectId, enabled]);

  const fetchMoreQuestions = useCallback(async () => {
    if (!offset) return;

    try {
      const data = await getSubjectQuestions(subjectId, { offset: offset });

      setQuestions(prev => ({
        ...prev,
        results: [...prev.results, ...data.results],
      }));

      setOffset(getNextOffset(data?.next));
    } catch (error) {
      console.error('Failed to fetch more questions:', error);
    }
  }, [subjectId, offset]);

  const { ref: triggerRef, isFetching } = useInfiniteScroll(fetchMoreQuestions);

  const handleReaction = async (questionId, reactionType) => {
    // 1. 중복 클릭 방지
    if (reactionLoading.current) return;
    reactionLoading.current = true;

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
      await reactToQuestion(questionId, { type: reactionType });
    } catch (error) {
      console.error('Failed to react to question:', error);
      setQuestions(previousQuestions); // Rollback
    } finally {
      reactionLoading.current = false;
    }
  };

  return { questions, loading, error, triggerRef, isFetching, handleReaction };
};
