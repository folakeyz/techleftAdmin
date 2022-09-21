import axios from "axios";
import {
  GET_LOG_FAIL,
  GET_LOG_REQUEST,
  GET_LOG_SUCCESS,
} from "../constants/logConstants";
import { BASE_URL } from "../config";

export const fetchLogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_LOG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/log/`, config);
    dispatch({
      type: GET_LOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOG_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
