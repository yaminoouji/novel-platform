const express = require("express");
const router = express.Router();
require("dotenv").config();
require("../passport");

const authRouter = require("./auth");
const novelRouter = require("./novel");

router.use("/auth", authRouter);

router.use("/novel", novelRouter);

module.exports = router;
