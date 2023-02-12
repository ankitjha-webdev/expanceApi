const verifySignUp = require("../middlewares/verifySignUp.js");
const controller = require("../controllers/auth.controller.js");
const router = require("express").Router();

// router.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

router.post("/signup", verifySignUp.checkDuplicateEmail, controller.signup);

router.post("/signin", controller.signin);

router.post("/signout", controller.signout);

//
// const {create, findAll, findOne, deleteUser, findAllByRole,update} = require('../controllers/user.controller');
// const router = require('express').Router();

// router.post('/', create);
// router.get('/all-user', findAll)
// router.get('/:id', findOne);
// router.put('/:id', update);
// router.delete('/:id', deleteUser);
// router.get('/all-user/:role', findAllByRole);

module.exports = router;
