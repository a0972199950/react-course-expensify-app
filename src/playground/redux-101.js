import {createStore} from "redux";

// 通常傳入dispatch的物件不會直接寫，而是用函數來回傳
// 理由其一是容易拼錯字；其二是拼錯字了瀏覽器也不會報錯
// {incrementBy = 1} = {}這段的意思是，首先我會吃一個物件引數，但如果沒參數讓我吃不到，我就預設他為空物件。像是：obj = {}
// 再來我要解構物件裡面的成員，我只需要incrementBy，所以改成{incrementBy} = {}
// 最後則是若incrementBy不存在，我要預設他為1，所以改寫成{incrementBy = 1} = {}
const incrementCount = ({incrementBy = 1} = {}) => ({
        type: "INCREMENT",
        incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: "DECREMENT",
    decrementBy
});

const resetCount = () => ({
    type: "RESET"
});

const setCount = ({count = 0} = {}) => ({
    type: "SET",
    count
});

// Reducer是一個會被傳進createStore()的函數，用來定義接到哪些action要對state做甚麼改動。而Reducers有兩個必要條件：
// 1. 必須為pure function。代表該函數所能做的事情「只能基於」被傳進去的參數，不能添加其他內容
// 2. 「不可」手動更改state和action。此會造成不可預期的錯誤
const countReducer = (state={ count: 0 }, action) => {
    switch(action.type){
        case "INCREMENT":
            // js的switch case裡面可以宣告變數
            // 那段我後來拿掉了，反正能宣告就是了
            return{
                count: state.count + action.incrementBy
            };

        case "DECREMENT":
            return{
                count: state.count - action.decrementBy
            };

        case "RESET":
            return{
                count: 0
            };

        case "SET":
            return{
                count: action.count
            }

        default:
            return state
    }
};

// createStore用來創建一個state container,
// 此函數預設需要傳入一個函數，該函數用於設定預設的state內容及可更改state內容的Actions
const store = createStore(countReducer);


// createStore內建方法，等同加上一個onChange監聽器到store上
// 特別的是它會回傳一個函數，那個函數的作用是解綁監聽器
const unsubscribe = store.subscribe(() => {
    // createStore內建方法，該方法回傳目前的state
    console.log(store.getState());
})

// .dispatch方法藉由傳入一個action(其實就是一個物件),來執行對state特定的操作
// 這個特定的操作則已經宣告在credateStore()裡面了
// 另外此物件「必須」要有一個type的property
store.dispatch(incrementCount()); // 應該要加1

store.dispatch(incrementCount({incrementBy: 5})); // 應該要加5


store.dispatch(resetCount()); // 應該要設為0


store.dispatch(decrementCount()); // 應該要減1

store.dispatch(decrementCount({decrementBy: 10})); // 應該要減10

store.dispatch(setCount({count: 7})); // 應該要設為7

