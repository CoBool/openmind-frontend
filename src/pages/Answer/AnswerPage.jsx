import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './AnswerPage.module.css';

import AnswerCard from '@/components/Answer/AnswerCard/AnswerCard';

import bannerImage1 from '@/assets/images/bannerImage1.png';
import fallbackProfile from '@/assets/images/profile.png';

// ✅ AnswerPage 전용 API 래퍼
import {
  fetchAnswerPageData,
  deleteAllQuestions,
  deleteOneQuestion,
  submitAnswer,
  editAnswer,
} from './answerApi';

function AnswerPage() {
  const { subjectId } = useParams();

  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { subject: subjectRes, questions: questionsList } =
        await fetchAnswerPageData(subjectId);

      setSubject(subjectRes);
      setQuestions(questionsList);
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

  const handleDeleteAll = useCallback(async () => {
    if (questions.length === 0) return;

    try {
      await deleteAllQuestions(questions);
      setQuestions([]);
    } catch (e) {
      setError(e);
    }
  }, [questions]);

  const handleDeleteOne = useCallback(async questionId => {
    try {
      await deleteOneQuestion(questionId);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    } catch (e) {
      setError(e);
    }
  }, []);

  const handleSubmitAnswer = useCallback(
    async (questionId, content) => {
      try {
        await submitAnswer(questionId, content);
        await fetchData();
      } catch (e) {
        setError(e);
      }
    },
    [fetchData]
  );

  const handleEditAnswer = useCallback(
    async (answerId, content) => {
      try {
        await editAnswer(answerId, content);
        await fetchData();
      } catch (e) {
        setError(e);
      }
    },
    [fetchData]
  );

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
        >
          삭제하기
        </button>
      </div>

      <section className={styles.listSection}>
        {isLoading ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyDesc}>불러오는 중...</p>
          </div>
        ) : error ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>문제가 발생했어요</p>
            <p className={styles.emptyDesc}>새로고침 후 다시 시도해 주세요.</p>
          </div>
        ) : questions.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>아직 질문이 없습니다.</p>
            <p className={styles.emptyDesc}>첫 질문을 받아보세요!</p>
          </div>
        ) : (
          <div className={styles.cardList}>
            {questions.map(question => (
              <AnswerCard
                key={question.id}
                question={question}
                onSubmitAnswer={handleSubmitAnswer}
                onEditAnswer={handleEditAnswer}
                onDeletePost={handleDeleteOne}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AnswerPage;
