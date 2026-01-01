import MessagesIcon from '../../assets/Icon/Messages.svg';
import ProfileImg from '../../assets/images/profile.png';
import { Avatar } from '../../components/Avatar';
import styles from './ListItems.module.css';

import { useNavigate } from 'react-router-dom';
import { Tootip } from './Tooltip';

// 리스트 아이템 컴포넌트
function ListItem({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${item.id}`);
  };
  
  const showTooltip = item.name.length >= 10;

  return (
    <div className={styles.listItem} onClick={handleClick}>
      <Avatar className={styles.profile}>
        <Avatar.Image src={item.imageSource} alt={`${item.name} 프로필`} />
        <Avatar.Fallback />
      </Avatar>

      <Tootip text={showTooltip ? item.name : ''}>
        <div className={styles.name}>{item.name}</div>
      </Tootip>

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
  );
}

export default ListItem;
