'use strict';

const express = require('express');
const verify = require('../api/verify');

const router = express.Router();

router.post('/start', verify.start);
router.post('/check', verify.check);

module.exports = router;