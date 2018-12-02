import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import expensesTotal from "../selectors/expenses-total";


export const ExpensesSummary = (props) => {
    return (
        <div>
            <p>
                Viewing {props.count} expenses totalling {numeral(props.total).format("$0,0")}
            </p>
        </div>
    )
};

const mapStateToProps = (state) => {
    const selectedExpenses = selectExpenses(state.expenses, state.filters);
    return{
        count: selectedExpenses.length,
        total: expensesTotal(selectedExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);