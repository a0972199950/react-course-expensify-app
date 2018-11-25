import moment from "moment";

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {

        const startDateMatch = !startDate || moment(expense.createdAt).isSameOrAfter(startDate, "date");
        const endDateMatch = !endDate || moment(expense.createdAt).isSameOrBefore(endDate, "date");
        const textMatch = !text || expense.description.includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((last, next) => {
        switch(sortBy){
            case "amount":
                return (last.amount < next.amount) ? -1 : 1;

            case "date": 
                return (last.createdAt < next.createdAt) ? -1 : 1;

            default:
                return 0;
        };
    });

};