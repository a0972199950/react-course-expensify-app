import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
// redux-thunk用於redux可以在dispatch裡接受函數傳入，而非只能是物件
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
}

