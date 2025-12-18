import styles from './UserCard.module.css'
import questionIcon from '../../assets/Icon/Messages.svg'

function UserCard() {
  return (
    <>
      <div className={styles.userCardWrap}>
        <div className={styles.userProfileWrap}>
          <div className={styles.userImg}></div>
          <div className={`body1 ${styles.body1Mobile}`}>아초는 고양이</div>
        </div>
        <div className={styles.questionWrap}>
          <div
            className={`${styles.receivedQuestion} body3 ${styles.body3Mobile}`}
          >
            <img
              src={questionIcon}
              alt="questionIcon"
              className={styles.questionIcon}
            />
            받은 질문
          </div>
          <div className={`body3 ${styles.body3Mobile}`}>9개</div>
        </div>
      </div>
    </>
  )
}

export default UserCard
