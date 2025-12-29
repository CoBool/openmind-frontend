import AnswerPage from './AnswerPage';

export default function Answer() {
  const post = null;

  const handleDeletePost = async postId => {
    console.log('delete post:', postId);
  };

  return <AnswerPage post={post} onDeletePost={handleDeletePost} />;
}
