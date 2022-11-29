'use strict';

const context = require('../models/context');
const { NCCOBuilder, Talk, OutboundCallWithNCCO } = require('@vonage/voice')

const TYPE = { PHONE: 'phone', SPEECH: 'speech', DTMF: 'dtmf' };
const ACTION = { TALK: 'talk', INPUT: 'input', CONNECT: 'connect', RECORD: 'record' };
const TTS_TEXT = 'This is a text to speech call from Vonage';

const call = async (req, res, next) => {
    try {
        const to = req.body.to || process.env.TO_NUMBER;
        const from = req.body.from || process.env.VONAGE_NUMBER;

        const builder = new NCCOBuilder();
        builder.addAction(new Talk(TTS_TEXT));
        await context.vonage.voice.createOutboundCall(
            new OutboundCallWithNCCO(
                builder.build(),
                { type: 'phone', number: to },
                { type: 'phone', number: from }
            )
        ).then(resp => {
            console.log(resp);
            res.status(200).send(resp);
        }).catch(err => {
            console.error(err);
        });;
    } catch (err) {
        return next(err);
    }
}

const receive = (req, res, next) => {
    try {
        const from = req.query.from
        const fromSplitIntoCharacters = from.split('').join(' ')

        const ncco = [{
            action: ACTION.TALK,
            text: `Thank you for calling from ${fromSplitIntoCharacters}`
        }]
        res.status(200).json(ncco);
    } catch (err) {
        return next(err);
    }
}

const dtmf = (req, res, next) => {
    try {
        const from = req.query.from
        console.log('Called on ' + from.split('').join(' '));

        const ncco = [{
            action: ACTION.TALK,
            text: 'Please enter a digit'
        },
        {
            action: ACTION.INPUT,
            type: [TYPE.DTMF],
            eventUrl: [`${req.protocol}://${req.get('host')}/voice/ondtmf`],
            maxDigits: 1
        }]
        res.status(200).json(ncco);
    } catch (err) {
        return next(err);
    }
}

const ondtmf = (req, res, next) => {
    try {
        const from = req.query.from
        console.log('Called on ' + from.split('').join(' '));

        const dtmf = req.body.dtmf;
        const ncco = [{
            action: ACTION.TALK,
            text: `You pressed ${dtmf}`
        }];
        res.status(200).json(ncco);
    } catch (err) {
        return next(err);
    }
}

const asr = (req, res, next) => {
    try {
        const ncco = [{
            action: ACTION.TALK,
            text: 'Please say something'
        },
        {
            action: ACTION.INPUT,
            type: [TYPE.SPEECH],
            eventUrl: [`${req.protocol}://${req.get('host')}/voice/onasr`],
            speech: {
                endOnSilence: 1,
                language: "en-US",
                uuid: [req.query.uuid]
            }
        }];
        res.status(200).json(ncco);
    } catch (err) {
        return next(err);
    }
}

const onasr = (req, res, next) => {
    try {
        const speech = req.body.speech.results[0].text;
        const ncco = [{
            action: ACTION.TALK,
            text: `You said ${speech}`
        }];
        res.status(200).json(ncco);
    } catch (err) {
        return next(err);
    }
}

const record = (req, res, next) => {
    try {
        const to = req.body.to || process.env.TO_NUMBER;
        const from = req.body.from || process.env.VONAGE_NUMBER;

        const ncco = [{
            action: ACTION.RECORD,
            eventUrl: [`${req.protocol}://${req.get('host')}/voice/onrecord`]
        },
        {
            action: ACTION.CONNECT,
            from: from,
            endpoint: [{
                type: TYPE.PHONE,
                number: to
            }]
        }];
        res.status(200).json(ncco);
    } catch (err) {
        return next(err);
    }
}

const onrecord = (req, res) => {
    try {
        const recording_url = req.body.recording_url
        console.log(`Recording URL = ${recording_url}`)
        res.status(204).send(recording_url);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    call,
    receive,
    dtmf,
    ondtmf,
    asr,
    onasr,
    record,
    onrecord
};