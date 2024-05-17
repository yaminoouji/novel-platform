const express = require('express');
const router = express.Router();
require('dotenv').config();
require('../passport');

const authRouter = require('./auth');

router.use('/auth', authRouter);

module.exports = router;
