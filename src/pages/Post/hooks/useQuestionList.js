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
  const storage = getReactionStorage(subjectId);
  storage[reaction.id] = {
    type: reaction.type,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(
    REACTION_STORAGE_PREFIX + subjectId,
    JSON.stringify(storage)
  );
};

/**
 * @description 리액션 저장소에서 질문에 대한 리액션을 제거합니다.
 * @param {number} subjectId - 질문 대상의 고유 식별자
 * @param {number} questionId - 질문의 고유 식별자
 */
const removeReactionStorage = (subjectId, questionId) => {
  const storage = getReactionStorage(subjectId);
  delete storage[questionId];

  localStorage.setItem(
    REACTION_STORAGE_PREFIX + subjectId,
    JSON.stringify(storage)
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

  useEffect(() => {
    if (!subjectId || !enabled) return;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getSubjectQuestions(subjectId);
        setQuestions(data);
        setOffset(getNextOffset(data?.next));
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
    // 1. 중복 클릭 방지
    const currentReaction = getReactionStorage(subjectId);
    if (currentReaction[questionId]) return;

    const reaction = {
      id: questionId,
      type: reactionType,
    };

    // 2. 낙관적 업데이트 (화면 먼저 변경)
    updateReactionCount(questionId, reactionType, +1);
    updateReactionStorage(subjectId, reaction);

    try {
      await reactToQuestion(questionId, { type: reactionType });
    } catch (error) {
      console.error('Failed to react to question:', error);
      updateReactionCount(questionId, reactionType, -1);
      removeReactionStorage(subjectId, questionId);
    }
  };

  return { questions, loading, error, triggerRef, isFetching, handleReaction };
};
