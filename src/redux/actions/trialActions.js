import axios from "axios";
import {
  ACTIVATE_ACCT_FAIL,
  ACTIVATE_ACCT_REQUEST,
  ACTIVATE_ACCT_SUCCESS,
  DELETE_ACCT_FAIL,
  DELETE_ACCT_REQUEST,
  DELETE_ACCT_SUCCESS,
  GET_T_FAIL,
  GET_T_REQUEST,
  GET_T_SUCCESS,
} from "../constants/trialConstants";
import { BASE_URL } from "../config";

export const patchAccount =
  (
    id,

    is_trial
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ACTIVATE_ACCT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.patch(
        `${BASE_URL}/user/${id}/`,
        {
          is_trial,
        },
        config
      );
      dispatch({
        type: ACTIVATE_ACCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTIVATE_ACCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ACCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.delete(`${BASE_URL}/user/${id}/`, config);
    dispatch({
      type: DELETE_ACCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ACCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchTrial = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_T_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/trial/`, config);
    dispatch({
      type: GET_T_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_T_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
