import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
        TWD {numeral(amount).format("$0,0")}
        -
        {moment(createdAt).format("YYYY/MM/DD HH:mm:ss")}</p>
    </div>
);



export default ExpenseListItem;