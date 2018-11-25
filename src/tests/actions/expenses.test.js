import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("shoule setup remove expense action object", () => {
    const result = removeExpense("abc123");

    // .toBe()使用的是"===", 而兩個物件或陣列在===下永遠不會相等
    // 因此jest提供.toEqual()函數用來比較物件和陣列
    expect(result).toEqual({
        type: "REMOVE_EXPENSE",
        id: "abc123"
    });
});

test("should setup edit expense action object", () => {
    const result = editExpense("abc123", { note: "new note", description: "new description" });

    expect(result).toEqual({
        type: "EDIT_EXPENSE",
        id: "abc123",
        updates: {
            note: "new note",
            description: "new description"
        }        
    });
});

test("should setup add expense action object with provided data", () => {
    const expense = {
        description: "new description",
        amount: 1111,
        createdAt: 2323,
        note: "new note"
    };

    const result = addExpense(expense);

    expect(result).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expense,
            id: expect.any(String)
        }
    })
});


test("should setup add expense action object with default data", () => {
    const result = addExpense();

    expect(result).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            description: "",
            amount: 0,
            createdAt: 0,
            note: "",
            id: expect.any(String)
        }
    })
});