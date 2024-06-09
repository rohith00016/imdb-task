const express = require("express");
const { login, logout, signup } = require("../controllers/auth.controller.js");
const upload = require("../utils/multer.js");

const router = express.Router();

router.post("/signup", upload.single("profilePic"), signup);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
