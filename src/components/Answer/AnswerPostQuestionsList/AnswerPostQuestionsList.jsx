import styles from './AnswerPostQuestionsList.module.css';
import AnswerCard from '@/components/answer/AnswerCard/AnswerCard';

export default function AnswerPostQuestionsList({ post, onDeletePost }) {
  // post가 아직 없으면 로딩/빈 상태 처리
  if (!post) {
    return <div className={styles.page}>답변하기 페이지</div>;
  }

  const questions = Array.isArray(post.questions) ? post.questions : [];

  return (
    <div className={styles.page}>
      {/* 상단 프로필/헤더 영역은 기존 프로젝트 컴포넌트가 있으면 거기로 교체 */}
      <div className={styles.container}>
        {/* 필요하면 여기서 “삭제하기=포스트 삭제” 버튼을 노출 */}
        {/* <button onClick={() => onDeletePost?.(post.id)}>삭제하기</button> */}

        <div className={styles.list}>
          {questions.map((q) => (
            <AnswerCard
              key={q.id}
              question={q}
              // ✅ “삭제하기=포스트 전체 삭제” 요구사항이면 카드에서 이 콜백만 호출하게 두면 됨
              onDeletePost={() => onDeletePost?.(post.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}