import styles from "./OpenmindHeader.module.css";

export function OpenmindHeader() {
  return (
    <header className={styles.header} aria-label="상단 헤더">
      <div className={styles.illust} aria-hidden="true">
        <HeaderIllustration />
      </div>
      <div className={styles.brand}>
        <div className={styles.logo}>OPENMIND</div>
      </div>
    </header>
  );
}

function HeaderIllustration() {
  return (
    <svg viewBox="0 0 1200 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 110c30-10 55-10 85 0 15 5 40 20 50 15 10-5-5-20-10-28-8-14 3-23 18-18 22 8 55 35 65 41" />
        <path d="M270 95c70-10 120-10 190 0 60 8 120 10 200 0" />
        <path d="M690 95c80-10 150-10 240 0 50 6 80 6 120 0" />
        <path d="M1010 52c22-10 40-12 62-2 18 8 26 22 26 40v20" />
        <path d="M1038 58l15 22" />
        <path d="M1072 54l-10 26" />
        <path d="M560 30c50-14 90-14 140 0" />
      </g>
    </svg>
  );
}
