const {
  create,
  deleteExpence,
  findAll,
  findAllByUserId,
  findOne,
  update,
  totalExpendedAmount,
  totalExpanse
} = require("../controllers/expense.controller.js");
const { verifyToken } = require("../middlewares/authJwt.js");
// const {verifyToken} = require('../middlewares/authJwt.js');
const router = require("express").Router();

// router.post('/',verifyToken,create);
router.get("/total-amount", totalExpanse);
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.get("/user/:id", findAllByUserId);
router.put("/:id", update);
router.delete("/:id", deleteExpence); 
router.get("/total-expended/:id", totalExpendedAmount);

module.exports = router;

// Path: backend\routes\expense.routes.js


// use custom query to get total amount expended by all users in sequelize 