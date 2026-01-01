import { instance } from './instance';

export const createAnswer = (questionId, body) => {
  return instance(`questions/${questionId}/answers`, {
    method: 'POST',
    body,
  });
};

export const patchAnswer = (answerId, body) => {
  return instance(`answers/${answerId}`, {
    method: 'PATCH',
    body,
  });
};

export const updateAnswer = (answerId, body) => patchAnswer(answerId, body);

export const deleteAnswer = answerId => {
  return instance(`answers/${answerId}`, {
    method: 'DELETE',
  });
};
