import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './AnswerPage.module.css';
import AnswerCard from '@/components/answer/AnswerCard/AnswerCard.jsx';

import bannerImage1 from '@/assets/images/bannerImage1.png';
import fallbackProfile from '@/assets/images/profile.png';

import { getAnswerSubject, getAnswerQuestions } from './answerApi';
import { deleteSubject } from '@/services/subjectsApi';
import { deleteQuestion } from '@/services/questionsApi';

function AnswerPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [subjectRes, questionsRes] = await Promise.all([
        getAnswerSubject(subjectId),
        getAnswerQuestions(subjectId, { limit: 10, offset: 0 }),
      ]);

      setSubject(subjectRes);
      setQuestions(questionsRes?.results ?? []);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const questionCount = useMemo(() => questions.length, [questions]);

  // ✅ 상단 "삭제하기" = Subject 삭제
  const handleDeleteAll = useCallback(async () => {
    const ok = window.confirm('피드와 질문을 모두 삭제할까요?');
    if (!ok) return;

    try {
      await deleteSubject(subjectId);
      navigate('/', { replace: true });
    } catch (e) {
      alert('삭제에 실패했습니다.');
    }
  }, [navigate, subjectId]);

  // ✅ 질문 1개 삭제 (AnswerCard 케밥용)
  const handleDeleteQuestion = useCallback(async questionId => {
    const ok = window.confirm('이 질문을 삭제할까요?');
    if (!ok) return;

    try {
      await deleteQuestion(questionId);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    } catch (e) {
      alert('질문 삭제에 실패했습니다.');
    }
  }, []);

  const profileSrc =
    subject?.imageSource || subject?.imageUrl || fallbackProfile;

  return (
    <div className={styles.page}>
      <section className={styles.topSection}>
        <div className={styles.bannerWrap}>
          <img className={styles.banner} src={bannerImage1} alt="banner" />
          <img
            className={styles.profileImage}
            src={profileSrc}
            alt="profile"
            onError={e => {
              e.currentTarget.src = fallbackProfile;
            }}
          />
        </div>
      </section>

      <div className={styles.profileMeta}>
        <div className={styles.nameBlock}>
          <h1 className={styles.subjectName}>{subject?.name ?? 'OPENMIND'}</h1>
          <div className={styles.questionCount}>
            <span className={styles.countBadge}>{questionCount}</span>
            <span>개의 질문이 있습니다</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.deleteAllButton}
          onClick={handleDeleteAll}
          disabled={isLoading}
        >
          삭제하기
        </button>
      </div>

      <section className={styles.listSection}>
        {isLoading ? (
          <div className={styles.emptyState}>불러오는 중...</div>
        ) : error ? (
          <div className={styles.emptyState}>문제가 발생했어요</div>
        ) : questions.length === 0 ? (
          <div className={styles.emptyState}>아직 질문이 없습니다.</div>
        ) : (
          <div className={styles.cardList}>
            {questions.map(question => (
              <AnswerCard
                key={question.id}
                question={question}
                onDeletePost={() => handleDeleteQuestion(question.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AnswerPage;
