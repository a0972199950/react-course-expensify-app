import React from "react";
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">amount</div>
        </div>
        
        <div className="list-body">
            {props.expenses.length > 0 ? (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense} />
                ))
            ) : (
                <div className="list-item list-item--message">
                    <span>No expenses</span>
                </div>                
            )}
        </div>
        
    </div>
);


const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

// connect()預設吃的參數是一個函數。
// connect()會自動將Provider的store的state傳入該函數，並且該函數必須要回傳一個物件，內容是你想要存取的tore內容(所以不會全部都能存取)
// 而呼叫connect()的時候丟給它別的東西，那就是你想要connect的組件
// 很奇怪的api吧 0.0
export default connect(mapStateToProps)(ExpenseList);

