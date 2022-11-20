'use strict';

const express = require('express');
const voice = require('../api/voice');

const router = express.Router();

router.post('/call', voice.call);
router.get('/receive', voice.receive);
router.get('/answer', voice.answer);
router.post('/events', voice.events);
router.get('/record', voice.record);
router.get('/account', voice.account);

module.exports = router;
