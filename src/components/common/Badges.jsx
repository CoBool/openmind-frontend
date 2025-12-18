import styles from './Badges.module.css';

function Badges({ isAnswered}) {
  return (
    <>
      <div
      className={`${styles.badgeBase}
      ${isAnswered ? styles.badgeComplete : styles.badgePending}
      caption1 medium`}>
        {isAnswered ? '답변 완료' : '미답변'}
      </div>
    </>
  );
}

export default Badges;
