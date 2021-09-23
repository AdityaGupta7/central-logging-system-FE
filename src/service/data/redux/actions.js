import { UPDATE_FILTERS_LIST } from "./actionTypes";

export const updateFiltersList = (data) => ({
    type: UPDATE_FILTERS_LIST,
    payload: data
});