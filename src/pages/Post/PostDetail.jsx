import { useParams, useNavigate } from 'react-router';

import { useSubject } from './hooks/useSubject';
import { useQuestionList } from './hooks/useQuestionList';

import { Card, CardContent } from '@/components/Card';

import { QuestionHeader, QuestionList } from './components';

import styles from './Post.shared.module.css';

export default function PostDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const { subject } = useSubject(subjectId);

  const { questions, loading, error, triggerRef, handleReaction } =
    useQuestionList(subjectId);

  if (error) {
    navigate('/');
    return null;
  }

  if (loading && !questions) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Card className={styles.detailCard}>
        {/* 헤더에 subject 정보가 필요하다면 subject 객체를 넘겨줄 수도 있습니다 */}
        <QuestionHeader questions={questions} subject={subject} />

        <CardContent className={styles.detailCardContent}>
          <QuestionList
            questions={questions}
            handleReaction={handleReaction}
            triggerRef={triggerRef}
          />
        </CardContent>
      </Card>
    </main>
  );
}
