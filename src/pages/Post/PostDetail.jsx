export default function PostDetail() {
  return (
    <main>
      <article>
        <h1>Post Detail</h1>
      </article>
      <section>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>{index}</div>
        ))}
      </section>
    </main>
  )
}
