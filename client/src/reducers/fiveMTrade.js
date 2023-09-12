import { GET_LATST_TRD, GET_TRD_RCRD } from "../actions/types";

const initialState = {
    trdData: null,
    allTrdData: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_LATST_TRD:
            return {
                ...state,
                trdData: payload,
            };
        case GET_TRD_RCRD:
            return {
                ...state,
                allTrdData: payload,
            };
        default:
            return state;
    }
}
