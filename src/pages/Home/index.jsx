import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BoxButton from '../../components/Button/BoxButton'
import { createSubject } from '../../services/subjectsApi'
import styles from './index.module.css'
import Logo from '../../assets/images/logo.png'

export default function Home() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!name.trim()) return

    try {
      const data = await createSubject({ name })
      navigate(`/post/${data.id}/answer`)
    } catch (error) {
      console.error(error)
      alert('피드 생성을 실패했습니다.')
    }
  }

  const goToAsk = () => navigate('/questions')

  const handleNameChange = e => setName(e.target.value)

  return (
    <div className={styles.background}>
      <div className={styles.contentsWrap}>
        <div className={styles.askBtn}>
          <BoxButton isArrow color="beige" onClick={goToAsk}>
            질문하러 가기
          </BoxButton>
        </div>

        <img src={Logo} className={styles.logo} alt="logo" />

        <div className={styles.formBox}>
          <form className={styles.formWrap} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className={styles.nameInput}
              value={name}
              onChange={handleNameChange}
            />
            <BoxButton size={'sizeMainBrown'}>질문받기</BoxButton>
          </form>
        </div>
      </div>
    </div>
  )
}
