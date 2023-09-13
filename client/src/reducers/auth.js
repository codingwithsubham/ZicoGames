import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  USERS_LOADED,
  GET_CRR_USR_TRD_DATA,
  GET_ALL_USR_TRD_DATA,
  GET_LTST_TRD_DATA,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  error: null,
  allTradingData: [],
  currenTradingData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };

    case USERS_LOADED:
      return {
        ...state,
        users: payload,
        loading: false,
        isAuthenticated: true,
      };

      case GET_ALL_USR_TRD_DATA:
      return {
        ...state,
        allTradingData: payload,
      };

      case GET_LTST_TRD_DATA:
      case GET_CRR_USR_TRD_DATA:
      return {
        ...state,
        currenTradingData: payload,
      };

    default:
      return state;
  }
}
