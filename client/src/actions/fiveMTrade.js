import axios from "axios";
import { API_CONFIG } from "../common/constants";
import { setAlert } from "./alert";
import { GET_LATST_TRD, GET_TRD_RCRD } from "./types";

//get latest trade
export const getLatstTrade = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/five-m-trade/get-latest", API_CONFIG);
        dispatch({
            type: GET_LATST_TRD,
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        dispatch(setAlert("Can't Fetch 5M Trade", "danger"));
    }
};

//get trade records
export const getTradeRecords = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/five-m-trade/get-records", API_CONFIG);
        dispatch({
            type: GET_TRD_RCRD,
            payload: res.data,
        });
    } catch (error) {
        dispatch(setAlert("Can't Fetch 5M Trade Records", "danger"));
    }
};
