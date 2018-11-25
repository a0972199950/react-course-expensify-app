import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
// Provider是react-redux庫提供的一個虛擬的最上層組件
// 他用來包住所有自創的組件，並且可以傳入redux的store(store = {store})
// 一旦傳入後，裡面的子組件就可以在需要store的時候使用connect()來連接redux store
import {Provider} from "react-redux";
// normalize.css是一長串某人寫好的，用來初始化所有瀏覽器預設樣式設定的css
import "normalize.css/normalize.css";
// 下方的import並非js code，而是scss code，
// 初始設定下webpack看不懂scss，他會認為這不是js而拋出error，
// 但藉由安裝node-scss, scss-loader並設定至webpack.config.js後，
// webpack就知道要用scss-loader把scss轉換成css後加進HTML的<style>裡
import "./styles/styles.scss";
import 'react-dates/lib/css/_datepicker.css';


import {addExpense, removeExpense, editExpense} from "./actions/expenses";
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import configureStore from "./store/ConfigureStore";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));



