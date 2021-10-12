import { combineReducers } from "redux";
import searchFieldReducer from "./searchFieldReducer";

const reducers = combineReducers({
    searchField: searchFieldReducer
});

export default reducers;