import { Avatar } from '@/components/Avatar';
import { CardContent } from '@/components/Card';

import { getTimeAgo } from '@/utils/date';

export default function QuestionAnswer({ answer, subject }) {
  return (
    <CardContent>
      <Avatar>
        <Avatar.Image src={subject.imageSource} alt={subject.name} />
        <Avatar.Fallback>테스트</Avatar.Fallback>
      </Avatar>
      <span>
        {subject.name} || {getTimeAgo(answer.createdAt)}
      </span>
      <p>{answer.content}</p>
    </CardContent>
  );
}
