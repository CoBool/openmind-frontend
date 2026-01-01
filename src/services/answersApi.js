import { instance } from './instance'

/**
 * @description URL 파라미터 `questionId`에 해당하는 질문에 답변 객체를 생성합니다.
 *
 * @param {number} questionId 질문의 고유 식별자
 * @param {Object} answer 답변 객체
 * @param {string} answer.content 답변의 내용
 * @param {boolean} answer.isRejected 답변 거부 여부
 *
 * @returns {Object} 생성된 답변 객체
 * @returns {number} returns.id 답변의 고유 식별자
 * @returns {number} returns.questionId 질문의 고유 식별자
 * @returns {string} returns.content 답변의 내용
 * @returns {boolean} returns.isRejected 답변 거부 여부
 * @returns {string} returns.createdAt 답변 생성 시점 (ISO 8601)
 *
 * @throws {Error} 답변 생성에 실패한 경우
 */
export const createAnswer = async (questionId, answer) => {
  const response = await instance(`questions/${questionId}/answers/`, {
    method: 'POST',
    body: JSON.stringify(answer),
  })

  if (!response.ok) {
    throw new Error('Failed to create answer')
  }

  return response.json()
}

/**
 * @description URL 파라미터 `answerId`에 해당하는 답변 정보를 조회합니다.
 *
 * @param {number} answerId 답변의 고유 식별자
 *
 * @returns {Object} 답변 객체
 * @returns {number} returns.id 답변의 고유 식별자
 * @returns {number} returns.questionId 질문의 고유 식별자
 * @returns {string} returns.content 답변의 내용
 * @returns {boolean} returns.isRejected 답변 거부 여부
 * @returns {string} returns.createdAt 답변 생성 시점 (ISO 8601)
 *
 * @throws {Error} 답변 정보 조회에 실패한 경우
 */
export const getAnswer = async answerId => {
  const response = await instance(`answers/${answerId}/`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch answer')
  }

  return response.json()
}

/**
 * @description URL 파라미터 `answerId`에 해당하는 답변 객체를 삭제합니다.
 *
 * @param {number} answerId 답변의 고유 식별자
 *
 * @returns {null} 유효한 요청일 경우 204 상태 코드가 반환됩니다.
 *
 * @throws {Error} 답변 삭제에 실패한 경우
 */
export const deleteAnswer = async answerId => {
  const response = await instance(`answers/${answerId}/`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete answer')
  }

  return null
}

/**
 * @description URL 파라미터 `answerId`에 해당하는 답변 객체를 수정합니다. (전체 수정)
 *
 * @param {number} answerId 답변의 고유 식별자
 * @param {Object} answer 답변 객체
 * @param {string} answer.content 답변의 내용
 * @param {boolean} answer.isRejected 답변 거부 여부
 *
 * @returns {Object} 수정된 답변 객체
 * @returns {number} returns.id 답변의 고유 식별자
 * @returns {number} returns.questionId 질문의 고유 식별자
 * @returns {string} returns.content 수정된 답변의 내용
 * @returns {boolean} returns.isRejected 수정된 답변 거부 여부
 * @returns {string} returns.createdAt 답변 생성 시점 (ISO 8601)
 *
 * @throws {Error} 답변 수정에 실패한 경우
 */
export const updateAnswer = async (answerId, answer) => {
  const response = await instance(`answers/${answerId}/`, {
    method: 'PUT',
    body: JSON.stringify(answer),
  })

  if (!response.ok) {
    throw new Error('Failed to update answer')
  }

  return response.json()
}

/**
 * @description URL 파라미터 `answerId`에 해당하는 답변 객체를 부분 수정합니다. (일부 필드 수정)
 *
 * @param {number} answerId 답변의 고유 식별자
 * @param {Object} answer 답변 객체
 * @param {string} answer.content 답변의 내용
 * @param {boolean} answer.isRejected 답변 거부 여부
 *
 * @returns {Object} 부분 수정된 답변 객체
 * @returns {number} returns.id 답변의 고유 식별자
 * @returns {number} returns.questionId 질문의 고유 식별자
 * @returns {string} returns.content 부분 수정된 답변의 내용
 * @returns {boolean} returns.isRejected 부분 수정된 답변 거부 여부
 * @returns {string} returns.createdAt 답변 생성 시점 (ISO 8601)
 *
 * @throws {Error} 답변 부분 수정에 실패한 경우
 */
export const patchAnswer = async (answerId, answer) => {
  const response = await instance(`answers/${answerId}/`, {
    method: 'PATCH',
    body: JSON.stringify(answer),
  })

  if (!response.ok) {
    throw new Error('Failed to patch answer')
  }

  return response.json()
}