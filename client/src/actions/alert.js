import { SET_ALERT, REMOVE_ALERT, SET_INSTA_ALERT, REMOVE_INSTA_ALERT } from "./types";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = math.ramdom();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

export const setInstaAlert =
  (msg, type, timeout = 9000) =>
  (dispatch) => {
    const id = math.ramdom();
    dispatch({
      type: SET_INSTA_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_INSTA_ALERT, payload: id }), timeout);
  };
