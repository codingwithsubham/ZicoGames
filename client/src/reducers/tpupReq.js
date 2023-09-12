import { GET_TPUP_REQS } from "../actions/types";

const initialState = {
  tpupreqs: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TPUP_REQS:
      return {
        ...state,
        tpupreqs: payload,
      };
    default:
      return state;
  }
}
