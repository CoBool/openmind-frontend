export const getTimeAgo = dateString => {
  const date = new Date(dateString)
  const now = new Date()

  if (isNaN(date.getTime())) return 'Invalid date'

  // 시간 차이(초 단위) 계산
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // 1. 방금 전 (1분 미만)
  if (seconds < 60) return '방금 전'

  // 2. 분 단위 (60분 미만)
  const minutes = seconds / 60
  if (minutes < 60) return `${Math.floor(minutes)}분 전`

  // 3. 시간 단위 (24시간 미만)
  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}시간 전`

  // 4. 일 단위 (30일 미만)
  const days = hours / 24
  if (days < 30) return `${Math.floor(days)}일 전`

  // 5. 달 단위 (12달 미만)
  const months = days / 30
  if (months < 12) return `${Math.floor(months)}달 전`

  // 6. 년 단위
  const years = days / 365
  return `${Math.floor(years)}년 전`
}
