const express = require("express");
const { protectRoute } = require("@middleware/auth.middleware.js");
const { uploadSingleFile } = require("@middleware/multer.middleware.js");
const {
  getUsers,
  getMessage,
  sendMessage,
} = require("@controller/message.controller.js");

const router = express.Router();

//message routes
router.get("/users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessage);
router.post("/:id", protectRoute, uploadSingleFile("file"), sendMessage);

module.exports = router;
