const ADJECTIVES = [
  '졸린',
  '느긋한',
  '조용한',
  '엉뚱한',
  '침착한',
  '성실한',
  '수상한',
  '용감한',
  '배고픈',
  '차분한',
  '느린',
  '빠른',
  '까칠한',
  '순한',
  '심드렁한',
];

const NOUNS = [
  '고양이',
  '여우',
  '판다',
  '수달',
  '늑대',
  '곰',
  '펭귄',
  '고래',
  '참새',
  '호랑이',
  '부엉이',
  '다람쥐',
  '고슴도치',
  '강아지',
  '오리',
];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

export const generateAnonymousName = () => {
  const a1 = pick(ADJECTIVES);
  let a2 = pick(ADJECTIVES);
  while (a1 === a2) {
    a2 = pick(ADJECTIVES);
  }

  return `${a1}${a2}${pick(NOUNS)}`;
};
