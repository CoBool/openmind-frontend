import MessagesIcon from '../../assets/Icon/Messages.svg'
import ProfileImg from '../../assets/images/profile.png'
import styles from './ListItems.module.css'

function ListItem({ item }) {
  return (
    <div className={styles.listItem}>
      <img src={ProfileImg} alt="프로필 이미지" className={styles.profile} />

      <div className={styles.name}>{item.name}</div>
      <div className={styles.question}>
        <img
          src={MessagesIcon}
          alt="메시지 아이콘"
          className={styles.messagesIcon}
        />
        <span>받은 질문</span>
        <span className={styles.questionCount}>{item.questionCount}개</span>
      </div>
    </div>
  )
}

export default ListItem
