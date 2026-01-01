import { useState, useRef } from 'react';

import { toast } from '@/components/Toast';

import { CardContent } from '@/components/Card';
import TextArea from '@/components/TextArea/TextArea';
import Button from '@/components/Button/Button';

export default function AnswerInputForm({ questionId, initialContent = '', onSubmit }) {
  const isEditMode = initialContent.trim().length > 0;

  const [isDisabled, setIsDisabled] = useState(!isEditMode);
  const TextAreaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ( TextAreaRef.current.value.trim().length === 0) return;

    setIsDisabled(true);

    try {
      await onSubmit(questionId, { content: TextAreaRef.current.value, isRejected: false });
      if (!isEditMode) {
        toast({
          title: '답변이 등록되었습니다',
        });
      }
      TextAreaRef.current.value = '';
      setIsDisabled(true);
    } catch {
      if (!isEditMode) {
        toast({
          title: '수정에 실패했습니다',
        });
      }
      setIsDisabled(false);
    }
  }

  const handleChange = e => {
    setIsDisabled(e.target.value.trim().length === 0);
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <TextArea placeholder="답변을 입력해주세요." onChange={handleChange} ref={TextAreaRef} defaultValue={initialContent} />
        <Button type="submit" disabled={isDisabled}>답변하기</Button>
      </form>
    </CardContent>
  );
}
