import { useState } from 'react'
import ThumbsUp from '../../assets/Icon/thumbs-up.svg'
import ThumbsDown from '../../assets/Icon/thumbs-down.svg'
import styles from './Reaction.module.css'

function Reaction() {
  const [reaction, setReaction] = useState(null)

  const handleLike = () => {
    setReaction(prev => (prev === 'like' ? null : 'like'))
  }

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
        <img src={ThumbsDown} className={styles.icon} />
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
        <img src={ThumbsUp} className={styles.icon} />
        <span>좋아요</span>
      </button>
    </div>
  )
}

export default Reaction
