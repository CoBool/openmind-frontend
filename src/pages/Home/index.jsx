import BoxButton from '../../components/Button/BoxButton'
import FloatingButton from '../../components/Button/FloatingButton'

export default function Home() {
  return (
    <div>
      {/* 1. 메인 페이지: 질문받기 (갈색 버튼, 화살표 없음) */}
      <BoxButton color="brown" size="sizeMainBrown">
        질문 받기
      </BoxButton>
      {/* 2. 메인 페이지: 질문하러 가기 (베이지 버튼, 화살표 있음) */}
      <BoxButton color="beige" size="sizeMain" isArrow={true}>
        질문하러 가기
      </BoxButton>

      {/* 3. 모달창: 질문 보내기 (갈색 버튼) */}
      <BoxButton color="brown" size="sizeModal">
        질문 보내기
      </BoxButton>
      {/* 4. 답변하기: 답변 완료 (갈색 버튼) */}
      <BoxButton color="brown" size="sizeWide">
        답변 완료
      </BoxButton>
      {/* 5. 답변하기: 수정 완료 (갈색 버튼) */}
      <BoxButton color="brown" size="sizeWide">
        수정 완료
      </BoxButton>
      {/* 6. 답변하기: 수정 완료 (갈색 버튼) */}
      <BoxButton color="brown" size="sizeWide" disabled="true">
        수정 완료
      </BoxButton>
      {/* 7. 질문 작성하기 버튼*/}
      <FloatingButton type="write">질문 작성</FloatingButton>
      {/* 8. 삭제하기 버튼*/}
      <FloatingButton type="delete">삭제하기</FloatingButton>
    </div>
  )
}
