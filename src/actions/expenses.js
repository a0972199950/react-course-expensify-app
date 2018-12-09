import database from "../firebase/firebase";

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense    
});

export const startAddExpense = (expenseData = {}) => {
    // 藉由在store裡面傳入redux-thunk，我們可以讓action不要return一個object，而是return一個函數進去store
    // redux-thunk會把dispatch傳進我們return的函數作為第一個參數來讓我們使用
    return (dispatch) => {
        // 解構expenseData
        const {description = "", note = "", amount = 0, createdAt = 0} = expenseData;
        const expense = { description, note, amount, createdAt };
        // push資料進firebase 
        // 這邊的return會return一個Promise，是為了給tests用的
        // 之後會在tests裡面再對上面的Promise連接.then()
        return database
            .ref("expenses")
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }))
            })
    }
}


export const removeExpense = (id = undefined) => ({
    type: "REMOVE_EXPENSE",
    id
});


export const startRemoveExpense = (id = undefined) => {
    return (dispatch) => {
        database
            .ref("expenses/" + id)
            .remove()
            .then(() => {
                console.log("remove succeed");
                dispatch(removeExpense(id));
            })
            .catch((e) => {
                console.log("remove failed", e);
            });

    }
}


export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});


export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        database
            .ref("expenses/" + id)
            .update({
                ...updates
            })
            .then(() => {
                console.log("update succeed");
                dispatch(editExpense(id, updates));
            })
            .catch((e) => {
                console.log("update failed", e);
            });
    }
}