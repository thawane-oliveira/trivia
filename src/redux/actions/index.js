export const SUBMIT_INFO = 'SUBMIT_INFO';
export const SCORE_POINTS = 'SCORE_POINTS';

export const submitInfo = (payload) => ({
  type: SUBMIT_INFO,
  payload,
});

export const addScorePoints = (value) => ({
  type: SCORE_POINTS,
  value,
});
