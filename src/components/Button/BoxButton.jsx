import styles from './BoxButton.module.css'
import arrowBrown from '../../assets/Icon/arrowRightBrown.svg'

/**
color: 색상 종류 (brown / beige)
size - 버튼 크기
- sizeMain: 메인/목록 페이지 (질문하러 가기)
- sizeMainBrown: 메인 페이지 전용 (질문받기)
- sizeModal: 모달창 내부 (질문 보내기)
- sizeWide : 답변하기 페이지 (답변 완료/수정 완료)

disabled: 버튼 비활성화 여부 (true/false)
onClick: 클릭했을 때 실행할 함수
isArrow - 화살표 아이콘 표시 유무 
*/
function BoxButton({
  children,
  color = 'brown',
  size = 'sizeMain',
  disabled = false,
  onClick,
  isArrow = false,
}) {
  return (
    // 클래스 3개 적용: 공통 + 색상 + 크기
    <button
      className={`${styles.button} ${styles[color]} ${styles[size]}`}
      disabled={disabled} // 버튼 비활성화
      onClick={onClick}
    >
      {children}
      {isArrow && (
        <img src={arrowBrown} alt="화살표 이미지" className={styles.icon} />
      )}
    </button>
  )
}

export default BoxButton
