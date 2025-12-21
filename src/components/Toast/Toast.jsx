import { useState } from 'react'
import LinkImg from '../../assets/Icon/Link.svg'
import KakaoImg from '../../assets/Icon/kakao.svg'
import FacebookImg from '../../assets/Icon/facebook.svg'
import styles from './Toast.module.css'

function Toast() {
  const [toast, setToast] = useState(false)

  const handleClick = () => {
    setToast(true)

    // 5초 후에 토스트 메시지 숨기기
    setTimeout(() => {
      setToast(false)
    }, 5000)
  }

  return (
    <div className={styles.Toast}>
      <img
        src={LinkImg}
        alt="링크 이미지"
        onClick={handleClick}
        className={styles.LinkImg}
      />
      <img src={KakaoImg} />
      <img src={FacebookImg} />

      {toast && (
        <div className={styles.ToastText}>
          <span className={styles.text}>URL이 복사되었습니다</span>
        </div>
      )}
    </div>
  )
}

export default Toast
