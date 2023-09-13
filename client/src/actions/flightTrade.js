import axios from "axios";
import { API_CONFIG } from "../common/constants";
import { setAlert } from "./alert";
import { GET_LATST_FLT_TRD, GET_CLR_FLT_RCRD } from "./types";

//get latest trade
export const getLatstTrade = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/flight-trade/get-latest", API_CONFIG);
        dispatch({
            type: GET_LATST_FLT_TRD,
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        dispatch(setAlert("Can't Fetch flight Trade", "danger"));
    }
};

//get trade records
export const getTradeRecords = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/flight-trade/get-records", API_CONFIG);
        dispatch({
            type: GET_CLR_FLT_RCRD,
            payload: res.data,
        });
    } catch (error) {
        dispatch(setAlert("Can't Fetch flight Trade Records", "danger"));
    }
};
