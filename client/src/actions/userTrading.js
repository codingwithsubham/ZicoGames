import axios from "axios";
import { API_CONFIG } from "../common/constants";
import { setAlert } from "./alert";
import { GET_ALL_USR_TRD_DATA, GET_CRR_USR_TRD_DATA, GET_LTST_TRD_DATA } from "./types";
import { getWallet } from "./wallet"

//get trading data by id for current user
export const getCurrentTradingData = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/user-trade/current-user/${id}`, API_CONFIG);
        dispatch({
            type: GET_CRR_USR_TRD_DATA,
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        dispatch(setAlert("Can't Fetch Trade data", "danger"));
    }
};

//get All trading data
export const getTradingData = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/user-trade", API_CONFIG);
        dispatch({
            type: GET_ALL_USR_TRD_DATA,
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        dispatch(setAlert("Can't Fetch Trade data", "danger"));
    }
};

//set trade data
export const setTradeData = (body) => async (dispatch) => {
    try {
        await axios.post("/api/user-trade/set", body, API_CONFIG);
        dispatch(setAlert("Trade Invested !!", "success"));
        dispatch(getWallet());
        dispatch(getCurrentTradingData(body?.tradeId));
    } catch (error) {
        dispatch(setAlert("Can't Trade Bad Request", "danger"));
    }
};

//get latest trading data by id
export const getLatestTradingData = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/user-trade/${id}`, API_CONFIG);
        dispatch({
            type: GET_LTST_TRD_DATA,
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        dispatch(setAlert("Can't Fetch Trade data", "danger"));
    }
};
