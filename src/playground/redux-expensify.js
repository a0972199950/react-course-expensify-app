import {createStore, combineReducers} from "redux";
import uuid from "uuid";

const addExpense = (
    {
        description = "", 
        note = "", 
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
    
});


const removeExpense = ({id = undefined} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});


const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});


const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});


const sortByDate = () => ({
    type: "SORT_BY_DATE"
});


const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});


const setStartDate = (startDate = undefined) => ({
    type: "SET_START_DATE",
    startDate
});


const setEndDate = (endDate = undefined) => ({
    type: "SET_END_DATE",
    endDate
});


// expenses的default資料和reducer
let expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        default: 
            return state;

        case "ADD_EXPENSE":
            return [...state, action.expense];

        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => (id !== action.id));

        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else{
                    return expense;
                }
            })
    };
};



// filters的default資料和reducer
let filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        default:
            return state;

        case "SET_TEXT_FILTER":
            return{
                ...state,
                text: action.text
            };
        
        case "SORT_BY_DATE":
            return{
                ...state,
                sortBy: "date"
            };

        case "SORT_BY_AMOUNT":
            return{
                ...state,
                sortBy: "amount"
            };

        case "SET_START_DATE":
            return{
                ...state,
                startDate: action.startDate
            };

        case "SET_END_DATE":
            return{
                ...state,
                endDate: action.endDate
            };
    };
};


const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof(startDate) !== "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof(endDate) !== "number" || expense.createdAt <= endDate;
        const textMatch = !text || expense.description.includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((last, next) => {
        switch(sortBy){
            case "amount":
                return (last.amount < next.amount) ? -1 : 1;

            case "date": 
                return (last.createdAt < next.createdAt) ? -1 : 1;

            default:
                return 0;
        };
    });

};


const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const expenses = getVisibleExpenses(state.expenses, state.filters);

    console.log(expenses);
})


const expense1 = store.dispatch(addExpense({
    description: "rent", 
    amount: 15000,
    createdAt: 1000
}));

const expense2 = store.dispatch(addExpense({
    description: "dinner", 
    amount: 150,
    createdAt: -1000
}));

const expense3 = store.dispatch(addExpense({
    description: "phone", 
    amount: 13000,
    createdAt: 500
}));

const expense4 = store.dispatch(addExpense({
    description: "pc", 
    amount: 40000,
    createdAt: -500
}));

const expense5 = store.dispatch(addExpense({
    description: "desk", 
    amount: 40000,
    createdAt: -500
}));

// console.log(expense1, expense2);


// store.dispatch(removeExpense({id: expense1.expense.id}));


// store.dispatch(editExpense(expense2.expense.id, {
//     amount: 1000
// }));


store.dispatch(setTextFilter(""));
// store.dispatch(setTextFilter());


store.dispatch(sortByAmount());
// store.dispatch(sortByDate());


store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(1000));
// store.dispatch(setEndDate());









const demoState = {
    expenses: [
        {
        id: "dskjfddsadf",
        description: "November Rent",
        note: "This was ths final payment for that address",
        amount: 15000,
        createdAt: 0
        }
    ],

    filters: {
        text: "rent",
        sortBy: "amount", // date or amount
        startDate: undefined,
        endDate: undefined
    }    
};

