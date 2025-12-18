<<<<<<< HEAD
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

=======
>>>>>>> 454b220 (fix: 미디어 쿼리 (모바일,태플릿) 수정(375px,768px) 및 테스트 코드 정리)
export default function Home() {
  return (
    <div>
      <h1>home</h1>
    </div>
  )
>>>>>>> f0d7b2e (feat: 공통 버튼 컴포넌트 추가)
}

export default Home;
