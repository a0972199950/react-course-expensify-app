import { ExpensesSummary } from "../../components/ExpensesSummary";
import { shallow } from "enzyme";
import React from "react";
import expensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expense";

let count, total, wrapper;
beforeEach(() => {
    wrapper = shallow(<ExpensesSummary />);
})

test("should render count and total with single expense", () => {
    const expense = [expenses[0]];
    count = expense.length;
    total = expensesTotal(expense);

    wrapper.setProps({ count, total });
    expect(wrapper).toMatchSnapshot();
});


test("should render count and total with multiple expenses", () => {
    count = expenses.length;
    total = expensesTotal(expenses);

    wrapper.setProps({ count, total });
    expect(wrapper).toMatchSnapshot();
});
