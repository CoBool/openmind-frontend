import styles from './UserCard.module.css';
import { Icon } from '@/components/Icon';

function UserCard({ name = '이름 없음', questionCount = 0 }) {
  return (
    <>
      <div className={styles.userCardWrap}>
        <div className={styles.userProfileWrap}>
          <div className={styles.userImg}></div>
          <div className={`font-body1 ${styles.body1Mobile}`}>{name}</div>
        </div>
        <div className={styles.questionWrap}>
          <div
            className={`${styles.receivedQuestion} font-body3 ${styles.body3Mobile}`}
          >
            <Icon name="messages" className={styles.questionIcon} />
            받은 질문
          </div>
          <div className={`font-body3 ${styles.body3Mobile}`}>
            {questionCount}개
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
