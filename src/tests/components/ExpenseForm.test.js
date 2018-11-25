import React from "react";
import ExpenseForm from "../../components/ExpenseForm";
import moment from "moment";
import { shallow } from "enzyme";
import expenses from "../fixtures/expense";

test("should render ExpenseForm", () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});


expenses.forEach((expense) => {
    test("should render ExpenseForm with expense to edit", () => {
        const wrapper = shallow(<ExpenseForm expenseToEdit={expense} />);
    
        expect(wrapper).toMatchSnapshot();
    });
});


test("should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);

    // .simulate("event", [...arrguments])用來模擬user的操作，其接受兩個參數
    // 第一個為event的字串；第二個為傳入event的參數
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });

    // 可透過wrapper.state("attribute")或wrapper.state().attribute來取用state內部資料
    expect(wrapper.state("error").length).toBeGreaterThan(0);
});


test("should set description on input change", () => {
    const value = "new description";
    const wrapper = shallow(<ExpenseForm />);

    // 用.at()來遍歷陣列
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    });

    expect(wrapper.state("description")).toBe(value);
});


test("should set note on textarea change", () => {
    const value = "new note";
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("textarea").simulate("change", {
        target: { value }
    });

    expect(wrapper.state("note")).toBe(value);
});


test("should set amount if valid input", () => {
    const value = "2344";
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });

    expect(wrapper.state("amount")).toBe(value);
});


test("should not set amount if invalid input", () => {
    const value = "abc";
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });

    expect(wrapper.state("amount")).toBe("");
});


test("should call submit prop for valid form submission", () => {
    // 創造一個假函數
    const onSubmitSpy = jest.fn();

    // 將假函數傳進組件當作argument
    const wrapper = shallow(<ExpenseForm expenseToEdit={expenses[0]} onSubmit={onSubmitSpy} />);

    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });

    expect(wrapper.state("error")).toBe("");

    const {description, amount, createdAt, note} = expenses[0];
    // .toHaveBeenCalledWith()和.toHaveBeenLastCalledWith()可以用來檢查假函數是否有被執行的同時被傳入特定的參數
    // 當假函數被執行複數次時，前者只要有任何一次符合就會通過；而後著則依定要最後一次符合才會通過
    expect(onSubmitSpy).toHaveBeenLastCalledWith({description, amount, createdAt, note});
});


test("should set new date on date change", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);

    // 使用.prop([函數名稱])([函數參數])來模擬組件的event
    // .simulate("click")這種只能用在原生的HTML tag上
    wrapper.find("SingleDatePicker").prop("onDateChange")(now);

    expect(wrapper.state("createdAt")).toBe(now);
});


test("should set calendarFocused on focus change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });

    expect(wrapper.state("calendarFocused")).toBe(focused);
});