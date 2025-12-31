import { useMemo } from "react";
import { AnswerHeader } from "../../components/answer/AnswerHeader/AnswerHeader.jsx";
import { AnswerCard } from "../../components/answer/AnswerCard/AnswerCard.jsx";
import { OpenmindHeader } from "../../components/layout/OpenmindHeader/OpenmindHeader.jsx";
import styles from "./AnswerPage.module.css";

const MOCK = [
  {
    id: "c1",
    status: "unanswered",
    question: "좋아하는 동물은?",
    fromName: "아초는고양이",
    createdAt: "2일전",
    initialAnswer: "",
  },
  {
    id: "c2",
    status: "answering",
    question: "좋아하는 동물은?",
    fromName: "아초는고양이",
    createdAt: "2일전",
    initialAnswer: "답변 입력하면 버튼 활성화!",
  },
  {
    id: "c3",
    status: "answered",
    question: "좋아하는 동물(들) 중에 정말 좋아하는 동물은? 좋아하는 이유는?",
    fromName: "아초는고양이",
    createdAt: "2일전",
    initialAnswer:
      "좋아하는 동물은 여러가지 있지만, 고양이가 제일 좋아요. 고양이의 눈빛과 털, 작은 발자국…",
  },
];

export default function AnswerPage() {
  const profileName = useMemo(() => localStorage.getItem("openmind:name") || "아초는고양이", []);

  return (
    <div className={styles.page}>
      <OpenmindHeader />

      <main className={styles.main}>
        <AnswerHeader
          name={profileName}
          questionCount={MOCK.length}
          onAskClick={() => alert("질문하러 가기 (라우팅은 다른 분이 구현)")}
        />

        <section className={styles.list} aria-label="질문 카드 리스트">
          {MOCK.map((item) => (
            <AnswerCard
              key={item.id}
              status={item.status}
              question={item.question}
              fromName={item.fromName}
              createdAt={item.createdAt}
              initialAnswer={item.initialAnswer}
              onSubmit={() => alert("답변 완료 (API/상태는 다른 분이 구현)")}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
