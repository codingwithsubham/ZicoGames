import axios from "axios";
import { API_CONFIG } from "../common/constants";
import { setAlert } from "./alert";
import { GET_TPUP_REQS, GET_WITHDRWL_REQS } from "./types";

//apprv top-up-request
export const apprvTopUpRequest = (body) => async (dispatch) => {
    try {
        await axios.post("/api/top-up-request/approve", body, API_CONFIG);
        dispatch(getPendingTopUpRequest());
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//decline top-up-request
export const dclineTopUpRequest = (body) => async (dispatch) => {
    try {
        await axios.post("/api/top-up-request/decline", body, API_CONFIG);
        dispatch(getPendingTopUpRequest());
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//get top-up-request
export const getPendingTopUpRequest = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/top-up-request/pending", API_CONFIG);
        dispatch({
            type: GET_TPUP_REQS,
            payload: res.data,
          });
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//apprv withdrawl-request
export const apprvWithdrawlRequest = (body) => async (dispatch) => {
    try {
        await axios.post("/api/withdrawl-request/approve", body, API_CONFIG);
        dispatch(getPendingWithdrawlRequest());
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//decline withdrawl-request
export const dclineWithdrawlRequest = (body) => async (dispatch) => {
    try {
        await axios.post("/api/withdrawl-request/decline", body, API_CONFIG);
        dispatch(getPendingWithdrawlRequest());
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//get withdrawl-request
export const getPendingWithdrawlRequest = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/withdrawl-request/pending", API_CONFIG);
        dispatch({
            type: GET_WITHDRWL_REQS,
            payload: res.data,
          });
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};