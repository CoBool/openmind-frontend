import { useState, useEffect } from 'react';

import { getSubject } from '@/services/subjectsApi';

/**
 * @description 질문 대상을 조회하는 훅
 * @param {number} subjectId - 질문 대상의 고유 식별자
 * @returns {Object} 질문 대상, 에러, 로딩 상태
 */
export const useSubject = subjectId => {
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      setLoading(true);
      try {
        const data = await getSubject(subjectId);
        setSubject(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [subjectId]);

  return { subject, loading, error };
};
