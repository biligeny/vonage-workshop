'use strict';

const express = require('express');
const verify = require('../api/verify');

const router = express.Router();

router.post('/request', verify.request);
router.post('/check', verify.check);

module.exports = router;