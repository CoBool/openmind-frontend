<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createSubject } from '@/services/subjectsApi';
import { useToast } from '@/contexts/Toast/Toast';
import { useAuth } from '@/provider/AuthPrivder';

import styles from './index.module.css';

import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';

import Logo from '@/assets/images/logo.png';
import PersonIcon from '@/assets/Icon/Person.svg?react';
import ArrowRight from '@/assets/Icon/Arrow-right.svg?react';

function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { onLogin } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('이름을 입력해주세요');
      return;
    }

    try {
      const data = await createSubject({ name });

      onLogin({
        name: data.name,
        id: data.id,
      });

      navigate(`/post/${data.id}/answer`);
    } catch (error) {
      console.error(error);
      alert('피드 생성을 실패했습니다.');
    }
  };

  const goToAsk = () => navigate('/list');
  const handleNameChange = e => setName(e.target.value);

  return (
    <Container>
      <div className={styles.background}>
        <header className={styles.header}>
          <div className={styles.askBtnWrap}>
            <Button onClick={goToAsk} className={styles.askBtn}>
              질문하러 가기
              <ArrowRight className={styles.arrowIcon} />
            </Button>
          </div>
        </header>
        <div className={styles.contentsWrap}>
          <div className={styles.logoWrap}>
            <img src={Logo} className={styles.logo} alt="logo" />
          </div>
          <div className={styles.formBox}>
            <form className={styles.formWrap} onSubmit={handleSubmit}>
              <InputField
                id="name"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={handleNameChange}
                icon={PersonIcon}
              />
              <Button className={styles.getQuestionBtn}>질문 받기</Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
=======
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
>>>>>>> f0d7b2e (feat: 공통 버튼 컴포넌트 추가)
}

export default Home;
