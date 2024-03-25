import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import {
  ALL_COMMENTS,
  POST_COMMENT,
  POST_ANSWER,
} from "../actionsTypes/CommentsTypes";

export const allComments = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}comments`,
        config
      );

      dispatch({ type: ALL_COMMENTS, payload: response.data });
    } catch (error) {
      return error;
    }
  };
};

export const postComment = (form, token, productId) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders(token);
      const body = { ...form, productId };
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}comments`,
        body,
        config
      );

      dispatch({ type: POST_COMMENT, payload: response.data });
    } catch (error) {
      return error.message;
    }
  };
};

export const postAnswer = (form, commentId, productId) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const body = { ...form, commentId };

      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}answer`,
        body,
        config
      );

      if (productId) {
        dispatch({ type: "POST_ANSWER_PRODUCTS", payload: response.data });
      } else {
        dispatch({ type: POST_ANSWER, payload: response.data });
      }
    } catch (error) {
      return error.message;
    }
  };
};

// export const postAnswerAdmin = (form, commentId) => {
//   return async function (dispatch) {
//     try {
//       const config = configureHeaders();
//       const body = { ...form, commentId };

//       const response = await axios.post(
//         "${import.meta.env.VITE_LOCALHOST}answer",
//         body,
//         config
//       );

//       dispatch({ type: POST_ANSWER_COMMENT_ID, payload: response.data });
//     } catch (error) {
//       return error.message;
//     }
//   };
// };
