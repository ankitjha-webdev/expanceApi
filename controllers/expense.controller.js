const db = require("../models");
// const { sequelize } = require('sequelize');
const Expense = db.expenses;
const User = db.users;
const sequelize = db.Sequelize;


// Create and Save a new Expense
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Expense
  const expense = {
    name: req.body.name,
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description,
    user_id: req.body.user_id,
  };

  // Save Expense in the database
  Expense.create(expense)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense.",
      });
    });
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
  Expense.findAll({ include: [User] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses.",
      });
    });
};

// Find a single Expense with an id

exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Expense with id=" + id,
      });
    });
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Expense.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id,
      });
    });
};

// Delete a Expense with the specified id in the request
exports.deleteExpence = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id,
      });
    });
};

// get all expenses by user id
exports.findAllByUserId = (req, res) => {
  const id = req.params.id;

  Expense.findAll({ where: { user_id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses.",
      });
    });
};

// total expended amount by user id
exports.totalExpendedAmount = (req, res) => {
  console.log(req.params.id + "req.params.id");
  const id = req.params.id;

  Expense.findAll({
    attributes: [[db.sequelize.fn("sum", db.sequelize.col("amount")), "total"]],
    where: { user_id: id },
  })
    .then((data) => {
      res.send(data);
      console.log(data + "data from totalExpendedAmount");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses.",
      });
    });
};

exports.totalExpanse = ( req, res) => {
  try {
    Expense.findAll({
      attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpenses'] ],
    }) .then((data) => {
      console.log(data);
      res.status(200).json(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving total expend amount.",
      });
    });


    // Expense.findAll().then((data) => {
    //   let total = 0;
    //   data.forEach((element) => {
    //     total += element.amount;
    //   });
    //   res.status(200).json({ total: total });
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Path: backend\controllers\user.controller.js
