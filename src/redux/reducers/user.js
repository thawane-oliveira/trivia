import { SUBMIT_INFO } from '../actions';

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
    score: 0,
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      score: 0,
    };

  default:
    return state;
  }
};

export default user;
