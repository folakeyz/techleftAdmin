import {
  ACTIVATE_ACCT_FAIL,
  ACTIVATE_ACCT_REQUEST,
  ACTIVATE_ACCT_RESET,
  ACTIVATE_ACCT_SUCCESS,
  DELETE_ACCT_FAIL,
  DELETE_ACCT_REQUEST,
  DELETE_ACCT_RESET,
  DELETE_ACCT_SUCCESS,
  GET_T_FAIL,
  GET_T_REQUEST,
  GET_T_RESET,
  GET_T_SUCCESS,
} from "../constants/trialConstants";

export const activateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATE_ACCT_REQUEST:
      return { loading: true };
    case ACTIVATE_ACCT_SUCCESS:
      return { loading: false, success: true };
    case ACTIVATE_ACCT_FAIL:
      return { loading: false, error: action.payload };
    case ACTIVATE_ACCT_RESET:
      return {};
    default:
      return state;
  }
};

export const getTrialReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_T_REQUEST:
      return { loading: true };
    case GET_T_SUCCESS:
      return { loading: false, success: true, trial: action.payload.results };
    case GET_T_FAIL:
      return { loading: false, error: action.payload };
    case GET_T_RESET:
      return {};
    default:
      return state;
  }
};

export const deactivateReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ACCT_REQUEST:
      return { loading: true };
    case DELETE_ACCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ACCT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_ACCT_RESET:
      return {};
    default:
      return state;
  }
};
