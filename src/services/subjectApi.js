// src/services/subjectsApi.js
import { instance } from './instance';

// 목록 조회 (정렬/페이지가 필요하면 params로)
export const getSubjects = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    qs.set(k, String(v));
  });

  const query = qs.toString();
  return instance(query ? `subjects?${query}` : 'subjects');
};

// 단건 조회
export const getSubject = subjectId => {
  if (subjectId === undefined || subjectId === null) {
    throw new Error('getSubject: subjectId is required');
  }
  return instance(`subjects/${subjectId}`);
};

// ✅ legacy export (예전 코드 호환: AnswerPage에서 getSubjectById를 쓰는 경우)
export const getSubjectById = subjectId => getSubject(subjectId);

// 생성
export const createSubject = body => {
  return instance('subjects', {
    method: 'POST',
    body,
  });
};

// 삭제
export const deleteSubject = subjectId => {
  return instance(`subjects/${subjectId}`, {
    method: 'DELETE',
  });
};
