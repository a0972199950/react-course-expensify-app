import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";


export class AddExpensePage extends React.Component{
    onSubmit = (expenseToAdd) => {
        this.props.startAddExpense(expenseToAdd);
        this.props.history.push("/");
    }

    render(){
        return(
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => {
        dispatch(startAddExpense(expense));
    }
});


// connect()照順序吃兩個參數，mapStateToProps()和mapDispatchToProps()
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
