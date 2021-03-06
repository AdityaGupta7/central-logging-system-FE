import { combineReducers } from "redux";
import { FETCH_LOGS_LISTING_EMPTY, FETCH_LOGS_LISTING_FAIL, FETCH_LOGS_LISTING_REQ, FETCH_LOGS_LISTING_SUCCESS, FETCH_MASTER_SOURCE_FAIL, FETCH_MASTER_SOURCE_REQ, FETCH_MASTER_SOURCE_SUCCESS, UPDATE_FILTERS_LIST } from "./actionTypes";

const initialStateFiltersList = {
    filtersList: []
};

const filtersList = (state = initialStateFiltersList, action) => {
    switch (action.type) {
        case UPDATE_FILTERS_LIST:
            return {
                filtersList: action.payload
            };
        default:
            return state;
    }
}

const initialStateSourceList = {
    sourceList: [],
    loading: false,
    error: null
}

const sourceList = (state = initialStateSourceList, action) => {
    switch (action.type) {
        case FETCH_MASTER_SOURCE_REQ:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_MASTER_SOURCE_SUCCESS:
            return {
                ...state,
                loading: false,
                sourceList: action.payload,
                error: null
            };
        case FETCH_MASTER_SOURCE_FAIL:
            return {
                ...state,
                loading: false,
                sourceList: [],
                error: "Could not fetch source"
            };
        default:
            return state;
    }
}

const initialStateAllLogs = {
    allLogs: [],
    loading: false,
    error: null,
    emptyMessage: null
}

const allLogs = (state = initialStateAllLogs, action) => {
    switch (action.type) {
        case FETCH_LOGS_LISTING_REQ:
            return {
                ...state,
                loading: true,
                error: null,
                emptyMessage: null
            };
        case FETCH_LOGS_LISTING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                emptyMessage: null,
                allLogs: action.payload
            };
        case FETCH_LOGS_LISTING_EMPTY:
            return {
                ...state,
                loading: false,
                error: null,
                emptyMessage: "No data available for the chosen parameters",
                allLogs: []
            };
        case FETCH_LOGS_LISTING_FAIL:
            return {
                ...state,
                loading: false,
                error: "Error occurred while fetching logs for the chosen parameters",
                emptyMessage: null,
                allLogs: []
            };
        default:
            return state;
    }
}

const allReducers = combineReducers({
    filtersList,
    sourceList,
    allLogs
});

export default allReducers;