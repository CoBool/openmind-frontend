import { useCallback, useState, useEffect } from 'react'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

import { getSubjects } from '@/services/subjects_api'

export default function PostDetail() {
  const [posts, setPosts] = useState(
    Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      title: `Post ${index}`,
      content: `Content of post ${index}`,
    }))
  )

  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await getSubjects()
      console.log(data)
    }
    fetchSubjects()
  }, [])

  const { ref, isFetching } = useInfiniteScroll(
    useCallback(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))

      setPosts(prev => [
        ...prev,
        ...Array.from({ length: 10 }).map((_, index) => ({
          id: prev.length + index,
          title: `Post ${prev.length + index}`,
          content: `Content of post ${prev.length + index}`,
        })),
      ])
    }, [])
  )

  return (
    <main>
      <article>
        <h1>Post Detail</h1>
      </article>
      <section>
        {posts.map(({ id, title, content }) => (
          <div
            key={id}
            style={{
              marginBottom: '20px',
              border: '1px solid #000',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
            }}
          >
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        ))}

        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              border: '1px solid #000',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
              marginBottom: '20px',
              marginTop: '20px',
            }}
            ref={ref}
          >
            더보기
          </div>
        )}
      </section>
    </main>
  )
}
