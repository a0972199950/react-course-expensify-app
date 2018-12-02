import selectExpenseTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expense";

test("should return 0 if no expenses passed in", () => {
    expect(selectExpenseTotal([])).toBe(0);
});

test("should add up a single expense", () => {
    expect(selectExpenseTotal([expenses[0]])).toBe(expenses[0].amount);
})

test("should add up multiple expenses", () => {
    expect(selectExpenseTotal(expenses)).toBe(
        expenses[0].amount + expenses[1].amount + expenses[2].amount
    );
})