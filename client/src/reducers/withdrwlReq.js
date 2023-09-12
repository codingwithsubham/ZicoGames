import { GET_WITHDRWL_REQS } from "../actions/types";

const initialState = {
  withdrwlreqs: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WITHDRWL_REQS:
      return {
        ...state,
        withdrwlreqs: payload,
      };
    default:
      return state;
  }
}
