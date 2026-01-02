import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createSubject } from '@/services/subjectsApi';
import { useToast } from '@/contexts/Toast/Toast';
import { useAuth } from '@/provider/AuthPrivder';

import styles from './index.module.css';
import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';

import { Field, FieldLabel } from '@/components/Field';
import { Input } from '@/components/Input';

import Logo from '@/assets/images/logo.png';

import { Icon } from '@/components/Icon';

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
  const handleNameChange = e => {
    setName(e.target.value);
  };

  return (
    <Container>
      <div className={styles.background}>
        <header className={styles.header}>
          <div className={styles.askBtnWrap}>
            <Button onClick={goToAsk} className={styles.askBtn}>
              질문하러 가기
              <Icon name="arrowRight" className={styles.arrowIcon} />
            </Button>
          </div>
        </header>
        <div className={styles.contentsWrap}>
          <div className={styles.logoWrap}>
            <img src={Logo} className={styles.logo} alt="logo" />
          </div>
          <div className={styles.formBox}>
            <form className={styles.formWrap} onSubmit={handleSubmit}>
              <Field className={styles.field}>
                <FieldLabel className={styles.fieldLabel}>
                  <Icon name="user" className={styles.personIcon} />
                  <Input id="name" name="name" className={`${styles.input} font-body3`} value={name} onChange={handleNameChange} placeholder="이름을 입력하세요." autoComplete="off" />
                </FieldLabel>
              </Field>
              <Button className={styles.getQuestionBtn}>질문 받기</Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
