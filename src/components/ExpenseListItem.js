import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>${amount} + time:{moment(createdAt).format("YY/MM/DD hh:mm:ss")}</p>
    </div>
);



export default ExpenseListItem;