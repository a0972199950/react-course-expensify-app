import React from "react";
import { ExpenseList } from "../../components/ExpenseList";
import { shallow } from "enzyme";
import expenses from "../fixtures/expense";

test("shoule render ExpenseList with expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);

    expect(wrapper).toMatchSnapshot();
});


test("should render ExpenseList with no expenses", () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);

    expect(wrapper).toMatchSnapshot();
});