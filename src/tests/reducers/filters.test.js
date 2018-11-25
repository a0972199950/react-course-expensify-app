import filtersReducer from "../../reducers/filters";
import moment from "moment";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../../actions/filters";


const defaultState = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
}


// redux在剛創建reducer的階段，會pass進{ type: "@@INIT" }來對reducer做初始化
// 所以這個case也必須測試
test("should init filter reducer", () => {
    expect(filtersReducer(undefined, { type: "@@INIT" })).toEqual(defaultState);
})


test("should setup set text filter reducer object", () => {
    expect(filtersReducer(defaultState, setTextFilter("rent"))).toEqual({
        ...defaultState,
        text: "rent"
    });
});


test("should setup sort by date reducer object", () => {
    expect(filtersReducer(defaultState, sortByDate())).toEqual({
        ...defaultState,
        sortBy: "date"
    });
});


test("should setup sort by amount reducer object", () => {
    expect(filtersReducer(defaultState, sortByAmount())).toEqual({
        ...defaultState,
        sortBy: "amount"
    });
});


test("should setup set start date reducer object", () => {
    expect(filtersReducer(defaultState, setStartDate(moment(1000)))).toEqual({
        ...defaultState,
        startDate: moment(1000)
    });
});


test("should setup set end date reducer object", () => {
    expect(filtersReducer(defaultState, setEndDate(moment(5000)))).toEqual({
        ...defaultState,
        endDate: moment(5000)
    });
});