import { useState } from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/Dialog';
import { Avatar } from '@/components/Avatar/Avatar';
import TextArea from '@/components/TextArea/TextArea';
import Button from '@/components/Button/Button';

import { toast } from '@/components/Toast';

import Messages from '@/assets/Icon/Messages.svg';
import Close from '@/assets/Icon/Close.svg';

import styles from './CreateModal.module.css';

export default function CreateModal({ subject, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSuccess(content);
      setContent('');
      setOpen(false);
      toast({
        title: '질문이 등록되었습니다',
        description: '질문이 등록되었습니다',
      });
    } catch (error) {
      console.error('Failed to create question:', error);
      toast({
        title: '질문 등록에 실패했습니다',
        description: '질문 등록에 실패했습니다',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={styles.trigger}>질문 작성하기</DialogTrigger>
      <DialogContent className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <img
              className={styles.headerIcon}
              src={Messages}
              alt="메시지 아이콘"
            />
            <h2 className={styles.headerTitle}>질문을 작성하세요</h2>
          </div>

          <DialogClose className={styles.close}>
            <img className={styles.closeIcon} src={Close} alt="닫기" />
          </DialogClose>
        </div>
        <div className={styles.QuestionTarget}>
          <span className={styles.toLabel}>To.</span>
          <Avatar className={styles.profileImg}>
            <Avatar.Image
              src={subject.imageSource}
              alt={`${subject.name} 프로필`}
            />
            <Avatar.Fallback>{subject.name[0]}</Avatar.Fallback>
          </Avatar>
          <span className={styles.targetName}>{subject.name}</span>
        </div>

        <TextArea
          placeholder="질문을 입력해주세요"
          className={styles.textArea}
          value={content}
          onChange={e => setContent(e.target.value)}
          autoFocus
        />

        <Button className={styles.submit} onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
          {isSubmitting ? '전송 중...' : '질문 보내기'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
