// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const configureStore = reducers => {
    const rootReducer = combineReducers(reducers);
    const middleware = applyMiddleware(thunkMiddleware);

    return createStore(rootReducer, middleware);
}

export default configureStore;