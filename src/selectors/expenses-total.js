export default (expenses = []) => (expenses
    .map((expense) => expense.amount)
    .reduce((total, current) => total + current, 0)
);