import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilter } from "../../components/ExpenseListFilter";
import { filters, altFilters } from "../fixtures/filter";
import moment from "moment";


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
    setTextFilter = sortByDate = sortByAmount = setStartDate = setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilter 
            filters={filters} 
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});


test("should render ExpenseListFilter", () => {
    expect(wrapper).toMatchSnapshot();
});


test("should render ExpenseListFilter with alt filters", () => {
    wrapper.setProps({
        filters: altFilters
    });

    expect(wrapper).toMatchSnapshot();
});


test("should set text filter", () => {
    const value = "new text";
    wrapper.find("input").prop("onChange")({target: {value}});

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});


test("should sort expense by date", () => {
    const value = "date";
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find("select").prop("onChange")({target: {value}});

    expect(sortByDate).toBeCalled();
});


test("should sort expense by amount", () => {
    const value = "amount";
    wrapper.find("select").prop("onChange")({target: {value}});

    expect(sortByAmount).toBeCalled();
});


test("should set start date and end date", () => {
    const startDate = moment(1000);
    const endDate = moment(10000);
    wrapper.find("DateRangePicker").prop("onDatesChange")({startDate, endDate});

    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
    expect(wrapper.state("calendarFocused")).toBe
});


test("should change focus of DateRangePicker", () => {
    const calendarFocused = "startDate";
    wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);

    expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});


