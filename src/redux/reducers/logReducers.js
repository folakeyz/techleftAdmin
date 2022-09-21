import {
  GET_LOG_FAIL,
  GET_LOG_REQUEST,
  GET_LOG_RESET,
  GET_LOG_SUCCESS,
} from "../constants/logConstants";

export const getLogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_REQUEST:
      return { loading: true };
    case GET_LOG_SUCCESS:
      return {
        loading: false,
        success: true,
        logs: action.payload.results,
      };
    case GET_LOG_FAIL:
      return { loading: false, error: action.payload };
    case GET_LOG_RESET:
      return {};
    default:
      return state;
  }
};
