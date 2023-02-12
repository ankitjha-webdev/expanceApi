const router = require("express").Router();
const {
    findAll,
    findOne,
    update,
    deleteUser,
} = require("../controllers/user.controller.js");

router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", deleteUser);


module.exports = router;

// Path: backend\routes\index.js
