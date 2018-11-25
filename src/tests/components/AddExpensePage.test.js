import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expense";

// beforeEach(fn())是一個life cycle function，會在執行每個test()之前執行一次
let addExpense, history, wrapper;
beforeEach(() => {
    addExpense = jest.fn();
    history = {
        push: jest.fn()
    };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test("should render AddExpensePage", () => {
    expect(wrapper).toMatchSnapshot();
});


test("should handle submit", () => {   
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);

    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
});