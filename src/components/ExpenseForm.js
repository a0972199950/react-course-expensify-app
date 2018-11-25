import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            description: props.expenseToEdit ? props.expenseToEdit.description : "",
            note: props.expenseToEdit ? props.expenseToEdit.note : "",
            amount: props.expenseToEdit ? props.expenseToEdit.amount : "",
            createdAt: props.expenseToEdit ? moment(props.expenseToEdit.createdAt) : moment(),
            calendarFocused: false,
            error: ""
        };
    }

    onDescriptionChange = (event) => {
        const description = event.target.value;
        this.setState(() => ({ description }));
    }

    onNoteChange = (event) => {
        const note = event.target.value;
        this.setState(() => ({ note }));
    }

    onAmountChange = (event) => {
        const amount = event.target.value;
        // 這表達式到底是三小也太複雜了......
        if(amount.match(/^\d*(\.{0,0})?$/)){
            this.setState(() => ({ amount }));
        }
    }

    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }))
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }

    onSubmit = (event) => {
        event.preventDefault();

        if(!this.state.description || !this.state.amount){
            this.setState(() => ({ error: "Please provide the description and amount" }));
        } else{
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseInt(this.state.amount),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        value={this.state.description}
                        placeholder="description"
                        onChange={this.onDescriptionChange}
                        // autoFocus的作用是讓網頁剛進入時就FOCUS在某個input上面，
                        // 這樣user就不用再把游標移過去
                        autoFocus
                    />

                    <input 
                        type="text"
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />

                    <textarea
                        placeholder="note(optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>

                    <button>{this.props.expenseToEdit ? "Edit Expense" : "Add Expense"}</button>
                </form>
            </div>
        );        
    }
}