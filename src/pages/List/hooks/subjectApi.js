import { useEffect, useState } from 'react';
import { getSubjects } from '../../../services/subjectsApi';

export const useSubjects = ({ page, limit }) => {
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSubjects = async () => {
      try {
        setLoading(true);

        const data = await getSubjects({
          limit,
          offset: (page - 1) * limit,
        });

        if (!mounted) return;

        setList(data.results);
        setTotalCount(data.count);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSubjects();

    return () => {
      mounted = false;
    };
  }, [page, limit]);

  return { list, totalCount, loading, error };
};
