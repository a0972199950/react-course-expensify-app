import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expense";

let editExpense, removeExpense, history, wrapper;
beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = {
        push: jest.fn()
    };
    wrapper = shallow(
        <EditExpensePage 
            expenseToEdit={expenses[1]}
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
        />
    );
});

test("should render EditExpensePage", () => {
    expect(wrapper).toMatchSnapshot();
});


test("should handle edit expense", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);

    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
});


test("should handle remove expense", () => {
    wrapper.find("button").prop("onClick")();

    expect(removeExpense).toHaveBeenLastCalledWith(expenses[1].id);
    expect(history.push).toHaveBeenLastCalledWith("/");
});