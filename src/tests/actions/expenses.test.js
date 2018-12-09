import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from "../fixtures/expense";
import database from "../../firebase/firebase";

const middleware = [ thunk ];
const createMockStore = configureStore(middleware);

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
    
    const result = addExpense(expenses[0]);

    expect(result).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[0]
    })
});


// test()預設是非同步的，他不會等待內部需長時間執行的工作結束後再判斷測試通過與否，
// 若它執行到最後一行都沒有收到錯誤的話它就會視為通過。
// 因此，若要強制讓test()等待內部工作完成再判斷通過與否的話，需要在test()第二個參數的函數裡傳入done
// done也是一個函數，當有傳入done時，test()會等待你實際執行done()時才判斷測試通過與否
test("should add expense to database and store", (done) => {
    const initialState = {};
    const store = createMockStore(initialState);

    const expense = {
        description: "test description",
        amount: 1000,
        createdAt: 0,
        note: "test note"
    };

    store.dispatch(startAddExpense(expense)).then(() => {
        // redux-mock-store創建的store提供一個特別的方法.getActions()，可回傳dispatch()進的action物件
        // 注意它是回傳多個action物件成一個陣列
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expense
            }
        });

        // 藉由在一號Promise的.then()裡面回傳二號Promise，就可以把二號Promise的resolve()的內容當成參數傳給一號Promise的下一個.then()
        return database.ref("expenses/" + actions[0].expense.id).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test("should add expense with default to database and store", (done) => {
    const initialState = {};
    const store = createMockStore(initialState);

    const defaultExpense = {
        description: "",
        amount: 0,
        createdAt: 0,
        note: ""
    }

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...defaultExpense
            }
        });

        return database.ref("expenses/" + actions[0].expense.id).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpense);
        done();
    });
});

// test("should setup add expense action object with default data", () => {
//     const result = addExpense();

//     expect(result).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             description: "",
//             amount: 0,
//             createdAt: 0,
//             note: "",
//             id: expect.any(String)
//         }
//     })
// });