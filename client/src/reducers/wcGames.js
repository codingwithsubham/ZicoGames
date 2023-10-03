import { CREATE_WC_GAMES, GET_WC_GAMES } from '../actions/types';

const initialState = {
  games: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WC_GAMES:
      return {
        ...state,
        games: payload.reverse(),
      };
    case CREATE_WC_GAMES:
      return {
        ...state,
        games: [payload, ...state.games],
      };
    default:
      return state;
  }
}
