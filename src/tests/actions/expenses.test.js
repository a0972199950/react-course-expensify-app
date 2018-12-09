import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { addExpense, startAddExpense, removeExpense, startRemoveExpense, editExpense, startEditExpense, setExpenses, startSetExpenses } from "../../actions/expenses";
import expenses from "../fixtures/expense";
import database from "../../firebase/firebase";

const middleware = [ thunk ];
const createMockStore = configureStore(middleware);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, amount, createdAt, note}) => {
        expensesData[id] = {description, amount, createdAt, note};
    });

    database.ref("expenses").set(expensesData).then(() => done());
})

test("shoule setup remove expense action object", () => {
    const result = removeExpense("abc123");

    // .toBe()使用的是"===", 而兩個物件或陣列在===下永遠不會相等
    // 因此jest提供.toEqual()函數用來比較物件和陣列
    expect(result).toEqual({
        type: "REMOVE_EXPENSE",
        id: "abc123"
    });
});


test("should remove expenses from firebase", (done) => {
    const initialState = {};
    const store = createMockStore(initialState);

    const id = expenses[0].id;

    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id
        });

        database.ref("expenses/" + id).once("value").then((snapshot) => {
            const dataHadBeenRemove = snapshot.val();

            // expect().toBeFalsy()用來檢查前面的值是否為undefined/null/false/"" ...
            // 若在.ref()地位到一個不存在的位址並使用once()叫出snapshot的話，該snapshot的.val()會回傳null
            expect(dataHadBeenRemove).toBeFalsy();

            done();
        });
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


test("should edit expense from firebase", (done) => {
    const initialState = {};
    const store = createMockStore(initialState);

    const id = expenses[0].id;
    const updates = {
        description: "editted content for test suitcase",
        amount: 87076677
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates
        });

        return database.ref("expenses/" + id).once("value");
        
    }).then((snapshot) => {
        const expenseDataObj = {
            id: snapshot.key,
            ...snapshot.val()
        };

        expect(expenseDataObj).toEqual({
            ...expenses[0],
            ...updates
        });

        done();
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


test("should setup set expenses action object with data", () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses
    });
});


test("should fatch expenses from database and dispatch to redux", (done) => {
    const initialState = [];
    const store = createMockStore(initialState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });

        return database.ref("expenses").once("value");

    }).then((snapshot) => {
        const dataArray = [];

        snapshot.forEach((childSnapshot) => {
            dataArray.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        expect(dataArray).toEqual(expenses);

        done();
    });
});