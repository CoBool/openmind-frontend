import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
/**
 * Modal 컴포넌트
 *
 * 개선사항:
 * - document.body 대신 #portal div 사용
 *
 * 화면 중앙에 띄워지는 팝업창의 기본 틀
 *
 * @param {boolean} isOpen - true면 모달 보임, false면 안 보임
 * @param {function} onClose - 모달을 닫을 때 실행할 함수
 * @param {React.ReactNode} children - 모달 안에 들어갈 내용
 */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // portal div 요소 찾기
  const portalElement = document.getElementById('portal');
  // portal div가 없으면 body 사용
  const targetElement = portalElement || document.body;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      {/* 이 벤트 버블링 중단 */}
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    targetElement // body 대신 portal div
  );
}
export default Modal;
