import axios from "axios";

import { POST_USERS, LOGIN } from "../actionsTypes/LoginRegisterTypes";

export const postUsers = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:13050/register`,
        form
      );

      dispatch({ type: POST_USERS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};

export const postLogin = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:13050/login`, form);

      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};
