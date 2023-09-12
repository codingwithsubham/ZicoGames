import { GET_WALLET } from "../actions/types";

const initialState = {
  wallet: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WALLET:
      return {
        ...state,
        wallet: {...payload, history: payload.history.reverse()},
      };
    default:
      return state;
  }
}
