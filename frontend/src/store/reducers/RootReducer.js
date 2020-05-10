import { combineReducers } from "redux";
import accountReducer from "./AccountReducer";

const rootReducer = combineReducers({
    account: accountReducer
});

export default rootReducer;