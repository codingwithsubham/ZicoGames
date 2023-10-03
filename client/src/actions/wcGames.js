import axios from 'axios';
import { API_CONFIG } from '../common/constants';
import { setAlert } from './alert';
import { CREATE_WC_GAMES, GET_WC_GAMES } from './types';

//Get Games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/wc-games', API_CONFIG);
    dispatch({
      type: GET_WC_GAMES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert('Could not Fetch Games', 'danger'));
  }
};

//Get Games
export const getGameById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/wc-games/${id}`, API_CONFIG);
    return res.data;
  } catch (error) {
    dispatch(setAlert('Could not Fetch Games', 'danger'));
  }
};

//submit A Game
export const createGame = (body) => async (dispatch) => {
  try {
    const res = await axios.post('/api/wc-games/create', body, API_CONFIG);
    dispatch({
      type: CREATE_WC_GAMES,
      payload: res.data,
    });
    dispatch(setAlert('Game Created', 'success'));
    return res.data;
  } catch (error) {
    dispatch(setAlert("Couldn't Create", 'danger'));
  }
};


//Get Games
export const getGameUnit = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/wc-games/item/${id}`, API_CONFIG);
    return res.data;
  } catch (error) {
    dispatch(setAlert('Could not Fetch Games', 'danger'));
  }
};