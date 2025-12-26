import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createSubject } from '@/services/subjectsApi';
import { useToast } from '@/contexts/Toast/ToastCopy';
import styles from './index.module.css';
import BoxButton from '@/components/Button/BoxButton';
import Logo from '@/assets/images/logo.png';
import InputField from '@/components/InputField/InputField';
import PersonIcon from '@/assets/Icon/Person.svg?react';

function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('이름을 입력해주세요');
      return;
    }

    try {
      const data = await createSubject({ name });
      navigate(`/post/${data.id}/answer`);
    } catch (error) {
      console.error(error);
      alert('피드 생성을 실패했습니다.');
    }
  };

  const goToAsk = () => navigate('/list');

  const handleNameChange = e => setName(e.target.value);

  return (
    <div className={styles.background}>
      <div className={styles.contentsWrap}>
        <div className={styles.logoWrap}>
          <img src={Logo} className={styles.logo} alt="logo" />
        </div>

        <div className={styles.askBtn}>
          <BoxButton isArrow variant="beige" onClick={goToAsk}>
            질문하러 가기
          </BoxButton>
          <Link to="/list"></Link>
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
            <BoxButton variant="brown" size="mdFixed">
              질문 받기
            </BoxButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
