import { combineReducers } from "redux";

const initialStateFiltersList = {
    filtersList: []
};

const filtersList = (state = initialStateFiltersList, action) => {
    return {
        ...state,
        filtersList: action.payload
    };
}

const allReducers = combineReducers({
    filtersList
});

export default allReducers;