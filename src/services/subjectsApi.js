import { instance } from './instance';

/**
 * @description 질문을 받을 새로운 질문 대상(Subject)을 생성합니다.
 *
 * @param {Object} subject 질문 대상 객체
 * @param {string} subject.name 질문 대상의 이름
 *
 * @returns {Object} 생성된 질문 대상 객체
 * @returns {number} returns.id 질문 대상의 고유 식별자
 * @returns {string} returns.name 질문 대상의 이름
 * @returns {string} returns.imageSource 질문 대상 프로필 이미지 URL
 * @returns {number} returns.questionCount 질문 대상에 달린 질문 수
 * @returns {string} returns.createdAt 질문 대상 생성 시점 (ISO 8601)
 *
 * @throws {Error} 질문 대상 생성에 실패한 경우
 */
export const createSubject = async subject => {
  const response = await instance('subjects/', {
    method: 'POST',
    body: JSON.stringify(subject),
  });

  if (!response.ok) {
    throw new Error('Failed to create subject');
  }

  return response.json();
};

/**
 * @description 질문 대상 목록을 조회합니다.
 *
 * @param {Object} params
 * @param {number} params.limit 조회할 질문 대상 수
 * @param {number} params.offset 건너뛸 질문 대상 수
 * @param {'time'|'name'} params.sort 정렬 기준
 *
 * @returns {Promise<any>} 서버 응답을 Promise 형태로 반환
 * @returns {Object} 질문 대상 목록과 메타 데이터
 * @returns {number} returns.count 전체 질문 대상 수
 * @returns {string|null} returns.next 다음 페이지 URL
 * @returns {string|null} returns.previous 이전 페이지 URL
 * @returns {Object[]} returns.results 질문 대상 객체 배열
 *
 * @throws {Error} 질문 대상 목록 조회에 실패한 경우
 *
 */
export const getSubjects = async ({
  limit = 8,
  offset = 0,
  sort = 'time',
} = {}) => {
  const response = await instance(
    `subjects/?limit=${limit}&offset=${offset}&sort=${sort}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch subjects');
  }

  return response.json();
};

/**
 * @description URL 파라미터 `subjectId`에 해당하는 질문 대상 정보를 조회합니다.
 *
 * @param {number} subjectId 질문 대상의 고유 식별자
 *
 * @returns {Object} 질문 대상 객체
 * @returns {number} returns.id 질문 대상의 고유 식별자
 * @returns {string} returns.name 질문 대상의 이름
 * @returns {string} returns.imageSource 질문 대상 프로필 이미지 URL
 * @returns {number} returns.questionCount 질문 대상에 달린 질문 수
 * @returns {string} returns.createdAt 질문 대상 생성 시점 (ISO 8601)
 *
 * @throws {Error} 질문 대상 정보 조회에 실패한 경우
 */
export const getSubject = async subjectId => {
  const response = await instance(`subjects/${subjectId}/`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch subject');
  }

  return response.json();
};

/**
 * @description URL 파라미터 `subjectId`에 해당하는 질문 대상 객체를 삭제합니다.
 *
 * @param {number} subjectId 질문 대상의 고유 식별자
 *
 * @returns {null} 유효한 요청일 경우 204 상태 코드가 반환됩니다.
 *
 * @throws {Error} 질문 대상 삭제에 실패한 경우
 */
export const deleteSubject = async subjectId => {
  const response = await instance(`subjects/${subjectId}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete subject');
  }

  return null;
};
