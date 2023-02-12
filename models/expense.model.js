module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        name: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        },
    })
    return Expense;
}