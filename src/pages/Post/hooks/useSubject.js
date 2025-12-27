import { useState, useEffect } from 'react';

import { getSubject } from '@/services/subjectsApi';

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
