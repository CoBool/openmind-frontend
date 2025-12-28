import { Link } from 'react-router-dom';

import { Card } from '@/components/Card/Card';

export default function PostDetailError() {
  return (
    <main>
      <Card>
        음.. 뭔가 잘못되었어요.
        <Link to="/list">목록으로 돌아가기</Link>
      </Card>
    </main>
  );
}
