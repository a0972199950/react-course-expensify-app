import {createStore, combineReducers} from "Redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import getVisibleExpenses from "../selectors/expenses";

export default () => {
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}

