'use strict';

const express = require('express');
const voice = require('../api/voice');

const router = express.Router();

router.post('/call', voice.call);
router.get('/answer', voice.answer);
router.post('/answer', voice.answer);
router.get('/dtmf', voice.dtmf);
router.post('/ondtmf', voice.ondtmf);
router.get('/asr', voice.asr);
router.post('/onasr', voice.onasr);
router.get('/record', voice.record);
router.get('/onrecord', voice.onrecord);
router.get('/event', voice.event);
router.post('/event', voice.event);
router.get('/fallback', voice.fallback);
router.post('/fallback', voice.fallback);

module.exports = router;
