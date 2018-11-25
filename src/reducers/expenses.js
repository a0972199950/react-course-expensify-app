// expenses的default資料和reducer
let expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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