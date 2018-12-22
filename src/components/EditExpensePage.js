import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component{
    onSubmit = (expenseToEdit) => {
        this.props.startEditExpense(this.props.expenseToEdit.id, expenseToEdit)
        this.props.history.push("/");
    }

    handleDeleteExpense = () => {
        this.props.startRemoveExpense(this.props.expenseToEdit.id);
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>

                <div class="content-container">
                    <ExpenseForm 
                        expenseToEdit={this.props.expenseToEdit}
                        onSubmit={this.onSubmit} 
                    />

                    <button 
                        className="button button--secondary"
                        onClick={this.handleDeleteExpense}
                    >
                        Remove Expense
                    </button>
                </div>
                
                
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
    startEditExpense: (id, updates) => {
        dispatch(startEditExpense(id, updates))
    },
    startRemoveExpense: (id) => {
        dispatch(startRemoveExpense(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);