import { useState, useRef } from 'react';

import { toast } from '@/components/Toast';

import { CardContent } from '@/components/Card';
import TextArea from '@/components/TextArea/TextArea';
import Button from '@/components/Button/Button';

export default function AnswerInputForm({ questionId, onSubmit }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const InputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ( InputRef.current.value.trim().length === 0) return;

    setIsDisabled(true);

    try {
      await onSubmit(questionId, { content: InputRef.current.value, isRejected: false });
      toast({
        title: '답변이 등록되었습니다',
        description: '답변이 등록되었습니다',
      });
    } catch {
      toast({
        title: '답변 등록에 실패했습니다',
        description: '답변 등록에 실패했습니다',
      });
    } finally {
      setIsDisabled(false);
    }
  }

  const handleChange = e => {
    setIsDisabled(e.target.value.trim().length === 0);
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <TextArea placeholder="답변을 입력해주세요." onChange={handleChange} ref={InputRef} />
        <Button type="submit" disabled={isDisabled}>답변하기</Button>
      </form>
    </CardContent>
  );
}
