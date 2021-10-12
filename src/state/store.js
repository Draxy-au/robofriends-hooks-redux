import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';

const logger = createLogger();

export const store = createStore(
    reducers,
    {}, 
    applyMiddleware(thunk,logger)
)