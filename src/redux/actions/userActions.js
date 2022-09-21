import axios from "axios";
import {
  USER_AUTH_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_RESET,
  USER_AUTH_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  GET_ME_FAIL,
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  UPDATE_ME_FAIL,
  UPDATE_ME_REQUEST,
  UPDATE_ME_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  DEMO_FAIL,
  DEMO_REQUEST,
  DEMO_SUCCESS,
  JOIN_FAIL,
  JOIN_REQUEST,
  JOIN_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from "../constants/userConstants";
import { BASE_URL } from "../config";

export const userAuth = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_AUTH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/login/`,
      { email, password },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_AUTH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_AUTH_RESET });
};

export const getMe = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ME_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/account/`, config);
    dispatch({
      type: GET_ME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const RegisterUser =
  (username, first_name, last_name, email, password, is_superuser) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_ACCOUNT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/user/`,
        {
          username,
          first_name,
          last_name,
          email,
          password,
          is_superuser,
        },
        config
      );
      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DemoAcct =
  (first_name, last_name, email, mobile, location, industry) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEMO_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/user/trial`,
        { first_name, last_name, email, mobile, location, industry },
        config
      );
      dispatch({
        type: DEMO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEMO_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updateMyProfile =
  (first_name, last_name, username, email, id) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_ME_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/${id}/`,
        { first_name, last_name, username, email },
        config
      );
      dispatch({
        type: UPDATE_ME_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ME_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getallUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/user/`, config);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const authForgot = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/passwordreset/`,
      { email },
      config
    );
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const authReset = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/passwordreset/confirm/`,
      { password, token },
      config
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AcceptInvite =
  (
    user,
    company,
    date_of_birth,
    address,
    province,
    country,
    postal_code,
    hobbies,
    join_date,
    phone,
    employee_id
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: JOIN_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/employee/`,
        {
          user,
          company,
          date_of_birth,
          address,
          province,
          country,
          postal_code,
          hobbies,
          join_date,
          phone,
          employee_id,
        },
        config
      );
      dispatch({
        type: JOIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const removeUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

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
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
