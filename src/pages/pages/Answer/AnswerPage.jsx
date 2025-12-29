import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './AnswerPage.module.css';

import bannerImage1 from '@/assets/images/bannerImage1.png';
import UserCard from '@/components/UserCard/UserCard';
import AnswerCard from '@/components/answer/AnswerCard/AnswerCard';

import { deleteSubject, getSubject } from '@/services/subjectsApi';
import { getSubjectQuestions } from '@/services/questionsApi';

// NOTE: API 연동(답변 작성/수정/삭제)은 AnswerCard 내부에서 answersApi 사용

export default function AnswerPage() {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const answeredCount = useMemo(
    () => questions.filter(q => q?.answer?.content || q?.answer?.isRejected).length,
    [questions]
  );

  useEffect(() => {
    if (!subjectId) return;

    let ignore = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [subjectRes, questionsRes] = await Promise.all([
          getSubject(Number(subjectId)),
          getSubjectQuestions(Number(subjectId), { limit: 50 }),
        ]);

        if (ignore) return;

        setSubject(subjectRes);
        setQuestions(Array.isArray(questionsRes?.results) ? questionsRes.results : []);
      } catch (e) {
        if (ignore) return;
        setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    run();
    return () => {
      ignore = true;
    };
  }, [subjectId]);

  const handleClickAsk = () => {
    // 프로젝트 라우팅 구조에 맞춰 PostDetail로 이동
    navigate(`/post/${subjectId}`);
  };

  const handleDeletePost = async () => {
    if (!window.confirm('이 피드를 삭제할까요? 삭제 후 복구할 수 없습니다.')) return;

    try {
      await deleteSubject(Number(subjectId));
      alert('삭제되었습니다.');
      navigate('/list');
    } catch (e) {
      console.error(e);
      alert('삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const handlePatchQuestion = updatedQuestion => {
    setQuestions(prev => prev.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)));
  };

  if (loading) {
    return <div className={styles.page}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles.page}>
        데이터를 불러오지 못했습니다.
        <button type="button" className={styles.retryBtn} onClick={() => window.location.reload()}>
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <img src={bannerImage1} alt="banner" className={styles.banner} />
      </div>

      <div className={styles.container}>
        <div className={styles.topRight}>
          <button type="button" className={styles.askBtn} onClick={handleClickAsk}>
            질문하러 가기 →
          </button>
        </div>

        <div className={styles.headerWrap}>
          {subject && <UserCard user={subject} size="lg" />}
        </div>

        <div className={styles.countRow}>
          <span className={styles.countText}>🕑 {answeredCount}개의 질문이 있습니다</span>
        </div>

        <div className={styles.list}>
          {questions.map(q => (
            <AnswerCard
              key={q.id}
              question={q}
              onDeletePost={handleDeletePost}
              onPatchQuestion={handlePatchQuestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
