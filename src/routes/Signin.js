const express = require("express");
const router = express.Router();
const registerController = require("../controllers/signController");

router.post("/signin", registerController.handleNewUser);

module.exports = router;
