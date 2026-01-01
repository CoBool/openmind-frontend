import { useState } from 'react'
import { Icon } from '@/components/Icon';
import styles from './Reaction.module.css'

function Reaction() {
  const [reaction, setReaction] = useState(null)

  // 좋아요 처리
  const handleLike = () => {
    setReaction(prev => (prev === 'like' ? null : 'like'))
  }

  // 싫어요 처리
  const handleDislike = () => {
    setReaction(prev => (prev === 'dislike' ? null : 'dislike'))
  }

  return (
    <div className={styles.reactionBox}>
      <button
        type="button"
        className={[
          styles.item,
          reaction === 'dislike' && styles.active,
          reaction === 'like' && styles.inactive,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleDislike}
      >
        <Icon name="thumbsDown" className={styles.icon} />
        <span>싫어요</span>
      </button>

      <button
        type="button"
        className={[
          styles.item,
          reaction === 'like' && styles.active,
          reaction === 'dislike' && styles.inactive,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleLike}
      >
        <Icon name="thumbsUp" className={styles.icon} />
        <span>좋아요</span>
      </button>
    </div>
  )
}

export default Reaction
