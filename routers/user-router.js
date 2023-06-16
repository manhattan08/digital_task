const UserRouter = require('express').Router;
const router = new UserRouter();
const userController = require("../controllers/user-controller");
const validateUserData = require("../validations/user-validator");

router.post("/registration",validateUserData,userController.registration);
router.post("/login",userController.login);

module.exports = router;