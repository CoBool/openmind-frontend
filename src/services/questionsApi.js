import { instance } from './instance'

/**
 * @description URL 파라미터 `subjectId`에 해당하는 질문 대상에게 질문을 생성합니다.
 *
 * @param {number} subjectId 질문 대상의 고유 식별자
 * @param {Object} question 질문 객체
 * @param {string} question.content 질문 내용
 *
 * @returns {Object} 생성된 질문 객체
 * @returns {number} returns.id 질문의 고유 식별자
 * @returns {number} returns.subjectId 질문 대상의 고유 식별자
 * @returns {string} returns.content 질문 내용
 * @returns {number} returns.like 좋아요 수
 * @returns {number} returns.dislike 싫어요 수
 * @returns {string} returns.createdAt 질문 생성 시점 (ISO 8601)
 * @returns {Object|null} returns.answer 답변 객체 또는 null
 *
 * @throws {Error} 질문 생성에 실패한 경우
 */
export const createQuestion = async (subjectId, question) => {
  const response = await instance(`subjects/${subjectId}/questions/`, {
    method: 'POST',
    body: JSON.stringify(question),
  })

  if (!response.ok) {
    throw new Error('Failed to create question')
  }

  return response.json()
}

/**
 * @description URL 파라미터 `subjectId`에 해당하는 질문 대상의 질문 목록을 조회합니다.
 *
 * @param {number} subjectId 질문 대상의 고유 식별자
 * @param {Object} params
 * @param {number} params.limit 조회할 질문 수
 * @param {number} params.offset 건너뛸 질문 수
 *
 * @returns {Object} 질문 목록과 메타 데이터
 * @returns {number} returns.count 전체 질문 수
 * @returns {string|null} returns.next 다음 페이지 URL
 * @returns {string|null} returns.previous 이전 페이지 URL
 * @returns {Object[]} returns.results 질문 객체 배열
 *
 * @throws {Error} 질문 목록 조회에 실패한 경우
 */
export const getSubjectQuestions = async (
  subjectId,
  { limit = 8, offset = 0 } = {}
) => {
  const response = await instance(
    `subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }

  return response.json()
}

/**
 * @description URL 파라미터 `questionId`에 해당하는 질문 정보를 조회합니다.
 *
 * @param {number} questionId 질문의 고유 식별자
 *
 * @returns {Object} 질문 객체
 * @returns {number} returns.id 질문의 고유 식별자
 * @returns {number} returns.subjectId 질문 대상의 고유 식별자
 * @returns {string} returns.content 질문 내용
 * @returns {number} returns.like 좋아요 수
 * @returns {number} returns.dislike 싫어요 수
 * @returns {string} returns.createdAt 질문 생성 시점 (ISO 8601)
 * @returns {Object|null} returns.answer 답변 객체 또는 null
 *
 * @throws {Error} 질문 정보 조회에 실패한 경우
 */
export const getQuestion = async questionId => {
  const response = await instance(`questions/${questionId}/`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch question')
  }

  return response.json()
}

/**
 * @description URL 파라미터 `questionId`에 해당하는 질문 객체를 삭제합니다.
 *
 * @param {number} questionId 질문의 고유 식별자
 *
 * @returns {null} 유효한 요청일 경우 204 상태 코드가 반환됩니다.
 *
 * @throws {Error} 질문 삭제에 실패한 경우
 */
export const deleteQuestion = async questionId => {
  const response = await instance(`questions/${questionId}/`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete question')
  }

  return null
}

/**
 * @description URL 파라미터 `questionId`에 해당하는 질문에 리액션을 추가합니다.
 *
 * @param {number} questionId 질문의 고유 식별자
 * @param {Object} reaction 리액션 객체
 * @param {'like'|'dislike'} reaction.type 리액션 타입
 *
 * @returns {Object} 리액션이 반영된 질문 객체
 *
 * @throws {Error} 질문 리액션 처리에 실패한 경우
 */
export const reactToQuestion = async (questionId, reaction) => {
  const response = await instance(`questions/${questionId}/reaction/`, {
    method: 'POST',
    body: JSON.stringify(reaction),
  })

  if (!response.ok) {
    throw new Error('Failed to react to question')
  }

  return response.json()
}
