import React from "react";
import ExpenseListItem from "../../components/ExpenseListItem";
import { shallow } from "enzyme";
import expenses from "../fixtures/expense";

expenses.forEach((expense) => {
    test("should render ExpenseListItem with expense", () => {
        const wrapper = shallow(<ExpenseListItem {...expense}/>);
    
        expect(wrapper).toMatchSnapshot();
    })
})
