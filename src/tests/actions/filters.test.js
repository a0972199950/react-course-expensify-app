import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../../actions/filters";
import moment from "moment";

test("should setup set text filter action object with provided data", () => {
    expect(setTextFilter("rent")).toEqual({
        type: "SET_TEXT_FILTER",
        text: "rent"
    });
});


test("should setup set text filter action object with default data", () => {
    expect(setTextFilter()).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    });
});


test("should setup sort by date action object", () => {
    expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
});


test("shpuld setup sort by amount action object", () => {
    expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});


test("should setup set start date action object", () => {
    const startDate = moment(0);
    const result = setStartDate(startDate);

    expect(result).toEqual({
        type: "SET_START_DATE",
        startDate
    });
});


test("should setup set end date action object", () => {
    const endDate = moment(0);
    const result = setEndDate(endDate);

    expect(result).toEqual({
        type: "SET_END_DATE",
        endDate
    });
});