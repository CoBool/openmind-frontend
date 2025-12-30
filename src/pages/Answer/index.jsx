import AnswerPage from './AnswerPage'
import AnswerPage from './AnswerPage';

export default AnswerPage

export default function Answer() {
  const post = null; // TODO: post 주입 (post.questions 포함)
  const handleDeletePost = async (postId) => {
    // TODO: "포스트 전체 삭제 API"가 있으면 여기서 호출
    // 지금은 UI만 만들기라서 비워둠
    console.log('delete post:', postId);
  };

  return <AnswerPage post={post} onDeletePost={handleDeletePost} />;
}