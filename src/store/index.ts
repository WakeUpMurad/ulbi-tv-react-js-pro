import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const rootReducers = combineReducers(reducers);

export const store = createStore(rootReducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;