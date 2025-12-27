import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import { Card, CardContent } from '@/components/Card';

import { QuestionHeader, QuestionList } from './components';

import styles from './Post.shared.module.css';

import { Modal } from '@/components/ModalProvider/ModalProvider';
import { TestModal } from './components/TestModal/TestModal';

import { createQuestion } from '@/services/questionsApi';

import { Skeleton } from '@/components/Skeleton/Skeleton';

export default function PostDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const { subject, error } = useSubject(subjectId);

  const { questions, loading, triggerRef, handleReaction } =
    useQuestionList(subjectId);

  useEffect(() => {
    if (error) {
      navigate('/list', { replace: true });
    }
  }, [error, navigate]);

  if (loading) {
    return <div className={styles.pageFallback}>로딩 중...</div>;
  }

  if (error) {
    return null;
  }

  const handleSubmit = async text => {
    const newQuestion = await createQuestion(subjectId, { content: text });
    console.log('newQuestion', newQuestion);
  };

  return (
    <main>
      <Card className={styles.detailCard}>
        {/* 헤더에 subject 정보가 필요하다면 subject 객체를 넘겨줄 수도 있습니다 */}
        <QuestionHeader questions={questions} subject={subject} />

        <CardContent className={styles.detailCardContent}>
          <QuestionList
            subject={subject}
            questions={questions}
            handleReaction={handleReaction}
            triggerRef={triggerRef}
          />
        </CardContent>
      </Card>

      <Modal>
        <Modal.Trigger className={styles.modalTrigger}>
          고오급진 모달 컴포넌트 트리거
        </Modal.Trigger>
        <Modal.Content className={styles.modalContent}>
          <TestModal callback={handleSubmit} />
        </Modal.Content>
      </Modal>
    </main>
  );
}
