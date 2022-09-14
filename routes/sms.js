 'use strict';

const express = require('express');
const sms = require('../api/sms');

const router = express.Router();

router.post('/send', sms.send);
router.get('/receive', sms.receive);
router.post('/receive', sms.receive);
router.get('/dlr', sms.dlr);
router.post('/dlr', sms.dlr);

module.exports = router;