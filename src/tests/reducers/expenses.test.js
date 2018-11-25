import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expense";
import moment from "moment";

test("should set default state", () => {
    const state = expensesReducer(undefined, { type: "@@INIT" });

    expect(state).toEqual([]);
});


test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[1], expenses[2]]);
});


test("should not remove expense if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-1"
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});


test("should add an expense", () => {
    const action = {
        type: "ADD_EXPENSE",
        expense: {
            description: "surface",
            amount: 41990,
            createdAt: moment().valueOf(),
            note: "",
            id: "4"
        }
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([
        ...expenses,
        action.expense
    ]);
});


test("should edit an expense", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[0].id,
        updates: {
            description: "rent all year",
            amount: 150000
        }
    };
    const state = expensesReducer(expenses, action);

    expect({
        description: state[0].description, 
        amount: state[0].amount}
    ).toEqual({
        description: action.updates.description,
        amount: action.updates.amount
    });
});


test("should not edit expense if id not found", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: "-1",
        updates: {
            description: "rent all year",
            amount: 150000
        }
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
})