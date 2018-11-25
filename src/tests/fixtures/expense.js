import moment from "moment";

export default [
    {
        description: "rent",
        amount: 1000,
        createdAt: moment(0).valueOf(),
        note: "",
        id: "1"
    },
    {
        description: "coffee",
        amount: 5000,
        createdAt: moment(0).subtract(3, "days").valueOf(),
        note: "",
        id: "2"
    },
    {
        description: "dinner",
        amount: 3000,
        createdAt: moment(0).add(3, "days").valueOf(),
        note: "",
        id: "3"
    },
];