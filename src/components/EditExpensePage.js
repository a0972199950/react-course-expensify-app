import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component{
    onSubmit = (expenseToEdit) => {
        this.props.editExpense(this.props.expenseToEdit.id, expenseToEdit)
        this.props.history.push("/");
    }

    handleDeleteExpense = () => {
        this.props.removeExpense(this.props.expenseToEdit.id);
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <h3>Edit Expense</h3>
                <ExpenseForm 
                    expenseToEdit={this.props.expenseToEdit}
                    onSubmit={this.onSubmit} 
                />
                <button 
                    onClick={this.handleDeleteExpense}
                >
                    Delete
                </button>
            </div>
        );
    }
        
};




// connect函數除了會把props傳給要連結的組件外，也會把尚未包含state的props傳給mapStateToProps
const mapStateToProps = (state, props) => {
    return {
        expenseToEdit: state.expenses.find((expense) => expense.id === props.match.params.id)        
    }
};

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, updates) => {
        dispatch(editExpense(id, updates))
    },
    removeExpense: (id) => {
        dispatch(removeExpense(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);