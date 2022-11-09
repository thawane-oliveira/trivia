import { REQUEST, REQUEST_ERROR, SUCCESS } from '../actions';

const INITIAL_STATE = {
  search: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
    };
  case SUCCESS:
    return {
      ...state,
      search: action.info,
    };
  case REQUEST_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default reducer;
