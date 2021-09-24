import { urlService } from "../../services/urls";
import {
    UPDATE_FILTERS_LIST,
    FETCH_MASTER_SOURCE_REQ,
    FETCH_MASTER_SOURCE_SUCCESS,
    FETCH_MASTER_SOURCE_FAIL,
    FETCH_LOGS_LISTING_REQ,
    FETCH_LOGS_LISTING_SUCCESS,
    FETCH_LOGS_LISTING_FAIL
} from "./actionTypes";

export const updateFiltersList = (dispatch, data) => {
    dispatch({
        type: UPDATE_FILTERS_LIST,
        payload: data
    })
};

export const updateFiltersListInjector = dispatch => data => updateFiltersList(dispatch, data);

export const fetchMasterSource = async (dispatch) => {
    dispatch({ type: FETCH_MASTER_SOURCE_REQ });

    try {
        const response = await urlService.getSourceList();
        dispatch({ type: FETCH_MASTER_SOURCE_SUCCESS, payload: response.data });
    } catch (e) {
        console.log('trace -> ', e);
        dispatch({ type: FETCH_MASTER_SOURCE_FAIL });
    }
}

export const fetchLogsList = async (dispatch, reqPayload) => {
    dispatch({ type: FETCH_LOGS_LISTING_REQ });

    try {
        const response = await urlService.getAllLogs(reqPayload);
        dispatch({ type: FETCH_LOGS_LISTING_SUCCESS, payload: response.data });
    } catch (e) {
        dispatch({ type: FETCH_LOGS_LISTING_FAIL });
    }
}

export const fetchLogsListInjector = dispatch => {
    return reqPayload => fetchLogsList(dispatch, reqPayload);
}

export const clearLogsData = dispatch => {
    dispatch({ type: FETCH_LOGS_LISTING_SUCCESS, payload: [] });
}