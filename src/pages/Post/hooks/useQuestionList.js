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

const REACTION_STORAGE_PREFIX = 'reaction:';

/**
 * @description 리액션 저장소를 조회합니다.
 * @param {number} subjectId - 질문 대상의 고유 식별자
 * @returns {Object} 리액션 저장소
 */
const getReactionStorage = subjectId => {
  const storage = localStorage.getItem(REACTION_STORAGE_PREFIX + subjectId);
  return storage ? JSON.parse(storage) : {};
};

/**
 * @description 리액션 저장소를 업데이트합니다.
 * @param {number} subjectId - 질문 대상의 고유 식별자
 * @param {Object} reaction - 리액션 객체
 * @param {number} reaction.id - 리액션의 고유 식별자
 * @param {'like'|'dislike'} reaction.type - 리액션 타입
 */
const updateReactionStorage = (subjectId, reaction) => {
  localStorage.setItem(
    REACTION_STORAGE_PREFIX + subjectId,
    JSON.stringify(reaction)
  );
};

/**
 * @description 질문 목록을 조회하는 훅
 * @param {number} subjectId - 질문 대상의 고유 식별자
 * @param {Object} options - 옵션 객체
 * @param {boolean} options.enabled - 질문 목록 조회 여부
 * @returns {Object} 질문 목록, 오프셋, 에러, 로딩 상태, 트리거 참조, 페칭 상태, 리액션 핸들러
 */
export const useQuestionList = (subjectId, options = {}) => {
  const { enabled = false } = options;

  const [questions, setQuestions] = useState({});
  const [offset, setOffset] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const reactedQuestionsRef = useRef(new Map());

  useEffect(() => {
    if (!subjectId || !enabled) return;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getSubjectQuestions(subjectId);
        setQuestions(data);
        setOffset(getNextOffset(data?.next));

        const storage = getReactionStorage(subjectId);

        reactedQuestionsRef.current = new Map(
          Object.entries(storage).map(([key, value]) => [Number(key), value])
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
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

  const updateReactionCount = (questionId, reactionType, delta) => {
    setQuestions(prev => ({
      ...prev,
      results: prev.results.map(q =>
        q.id === questionId
          ? { ...q, [reactionType]: q[reactionType] + delta }
          : q
      ),
    }));
  };

  const handleReaction = async (questionId, reactionType) => {
    const id = Number(questionId);
    // 1. 중복 클릭 방지
    if (reactedQuestionsRef.current.has(id)) {
      return;
    }

    // 2. 메모리(Ref) 업데이트 (중복 방지)
    const newReaction = {
      id,
      type: reactionType,
      createdAt: new Date().toISOString(),
    };
    reactedQuestionsRef.current.set(id, newReaction);

    // 3. 낙관적 업데이트 (화면 먼저 변경)
    updateReactionCount(id, reactionType, +1);
    const currentData = Object.fromEntries(reactedQuestionsRef.current);
    updateReactionStorage(subjectId, currentData);

    try {
      await reactToQuestion(id, { type: reactionType });
    } catch (error) {
      console.error('Failed to react to question:', error);
      updateReactionCount(id, reactionType, -1);
      reactedQuestionsRef.current.delete(id);

      const rollbackData = Object.fromEntries(reactedQuestionsRef.current);
      updateReactionStorage(subjectId, rollbackData);
    }
  };

  return {
    questions,
    loading,
    error,
    triggerRef,
    isFetching,
    reactedQuestions: reactedQuestionsRef.current,
    handleReaction,
  };
};
