import selectorExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expense";


test("should filter expenses by provided text", () => {
    const filters = {
        text: "r",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };

    const result = selectorExpenses(expenses, filters);

    expect(result).toEqual([ expenses[0], expenses[2] ]);
});


test("should filter expenses by start date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined
    };

    const result = selectorExpenses(expenses, filters);

    expect(result).toEqual([ expenses[0], expenses[2] ]);
});


test("should filter expenses by end date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: moment(500)
    };

    const result = selectorExpenses(expenses, filters);

    expect(result).toEqual([ expenses[1], expenses[0] ]);
});


test("should filter expenses by start date and end date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0).subtract(1, "days"),
        endDate: moment(500)
    };

    const result = selectorExpenses(expenses, filters);

    expect(result).toEqual([ expenses[0] ]);
});


test("should sort expenses by amount", () => {
    const filters = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    };

    const result = selectorExpenses(expenses, filters);

    expect(result).toEqual([ expenses[0], expenses[2], expenses[1] ]);

});


test("should sort expenses by date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };

    const result = selectorExpenses(expenses, filters);

    expect(result).toEqual([ expenses[1], expenses[0], expenses[2] ]);

});