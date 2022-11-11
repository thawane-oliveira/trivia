export const SUBMIT_INFO = 'SUBMIT_INFO';
export const SCORE_POINTS = 'SCORE_POINTS';
export const ADD_ASSERTION = 'ADD_ASSERTION';

export const submitInfo = (payload) => ({
  type: SUBMIT_INFO,
  payload,
});

export const addScorePoints = (value) => ({
  type: SCORE_POINTS,
  value,
});

export const addAssertion = (one) => ({
  type: ADD_ASSERTION,
  one,
});
