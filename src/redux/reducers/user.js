import { SUBMIT_INFO } from '../actions';

const INITIAL_STATE = {
  user: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_INFO:
    return {
      user: {
        name: action.payload.name,
        email: action.payload.email,
      },
    };

  default:
    return state;
  }
};

export default reducer;
