import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker } from "react-dates";




export class ExpenseListFilter extends React.Component{
    state = {
        calendarFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    onTextChange = (event) => {
        this.props.setTextFilter(event.target.value);            
    }

    onSortByChange = (event) => {
        const sortBy = event.target.value;
        if(sortBy === "date") this.props.sortByDate()
        else if(sortBy === "amount") this.props.sortByAmount();
    }

    render(){
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        {/* value會不停地從state讀取資料並顯示，所以當state的資料改變時，它也會同步改變
                        但defaultValue不會持續讀取，只會在一開始時讀取一次。
                        所以若想持續追蹤資料，則必須使用value；同時加上onChange來讓輸入框可以被編輯 */}
                        <input 
                            type="text" 
                            className="text-input"
                            placeholder="Search expense"
                            value={this.props.filters.text} 
                            onChange={this.onTextChange} 
                        />
                    </div>

                    <div className="input-group__item">
                        <select 
                            className="select"
                            value={this.props.filters.sortBy} 
                            onChange={this.onSortByChange}
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>

                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate} 
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange} 
                            isOutsideRange= {() => false}
                            numberOfMonths={1}
                            showClearDates={true}
                        />
                    </div>
                </div>
            
                
        
                
        
                
            </div>
        );
    }
    
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => {dispatch(setTextFilter(text))},
    sortByDate: () => {dispatch(sortByDate())},
    sortByAmount: () => {dispatch(sortByAmount())},
    setStartDate: (startDate) => {dispatch(setStartDate(startDate))},
    setEndDate: (endDate) => {dispatch(setEndDate(endDate))}
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);

