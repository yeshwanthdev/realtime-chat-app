const express = require("express");
const { getUsers, getMessages } = require("@controller/message.controller.js");

const router = express.Router();

//message routes
router.get("/users", getUsers);
router.get("/:id", getMessages);

module.exports = router;
