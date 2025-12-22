import { useCallback, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { getSubject } from '@/services/subjectsApi';
import { getSubjectQuestions, reactToQuestion } from '@/services/questionsApi';
import { getTimeAgo } from '@/utils/date';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/Card';

import Messages from '@/assets/Icon/Messages.svg';
import ThumbsUp from '@/assets/Icon/thumbs-up.svg';
import ThumbsDown from '@/assets/Icon/thumbs-down.svg';

import styles from './PostDetail.module.css';

const TRIGGER_POINT = 2;

export default function PostDetail() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState({});
  const [questions, setQuestions] = useState({});
  const [offset, setOffset] = useState(null);

  const reactionLoding = useRef(false);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubject(subjectId);
        setSubject(data);
      } catch {
        console.error('404 Not Found');
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
        console.error('404 Not Found');
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

  return (
    <main>
      <Card className={styles.detailCard}>
        <CardHeader className={styles.detailCardHeader}>
          <CardTitle className={styles.detailCardTitle}>
            <img src={Messages} />
            {questions.count}개의 질문이 있습니다
          </CardTitle>
        </CardHeader>

        <CardContent className={styles.detailCardContent}>
          {questions &&
            questions.results?.map((question, index) => {
              const isTriggerPoint =
                index === questions.results.length - TRIGGER_POINT;

              return (
                <Card
                  key={question.id}
                  className={styles.detailItem}
                  ref={isTriggerPoint ? ref : null}
                >
                  <CardHeader className={styles.detailItemHeader}>
                    <span
                      className={`${styles.detailItemBadge} ${question.answer ? styles.badgeComplete : styles.badgePending}`}
                    >
                      {question.answer ? '답변 완료' : '미답변'}
                    </span>
                    <CardDescription className={styles.detailItemQuestion}>
                      <h2 className={styles.detailItemQuestionCreatedAt}>
                        질문 · {getTimeAgo(question.createdAt)}
                      </h2>
                      <h1 className={styles.detailItemQuestionTitle}>
                        {question.content}
                      </h1>
                    </CardDescription>
                  </CardHeader>

                  {question?.answer && (
                    <CardContent className={styles.detailItemAnswer}>
                      <div className={styles.detailItemAnswerThumbnail}>
                        <img
                          className={styles.detailItemAnswerThumbnailImage}
                          src={subject.imageSource}
                          alt={subject.name}
                        />
                      </div>
                      <div className={styles.detailItemAnswerContent}>
                        <div className={styles.detailItemAnswerAuthor}>
                          <span className={styles.detailItemAnswerAuthorName}>
                            {subject.name}
                          </span>
                          <span
                            className={styles.detailItemAnswerAuthorCreatedAt}
                          >
                            {getTimeAgo(question.answer?.createdAt)}
                          </span>
                        </div>
                        <div className={styles.detailItemAnswerDescription}>
                          {question.answer?.content}
                        </div>
                      </div>
                    </CardContent>
                  )}
                  <CardFooter className={styles.detailItemFooter}>
                    <div className={styles.detailItemFooterReactions}>
                      <button
                        className={styles.detailItemFooterReactionsButton}
                        onClick={() => handleReaction(question.id, 'like')}
                      >
                        <img src={ThumbsUp} />
                        <span
                          className={styles.detailItemFooterReactionsButtonText}
                        >
                          좋아요 {question.like}
                        </span>
                      </button>
                      <button
                        className={styles.detailItemFooterReactionsButton}
                        onClick={() => handleReaction(question.id, 'dislike')}
                      >
                        <img src={ThumbsDown} />
                        <span
                          className={styles.detailItemFooterReactionsButtonText}
                        >
                          싫어요 {question.dislike}
                        </span>
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
        </CardContent>
      </Card>
    </main>
  );
}
