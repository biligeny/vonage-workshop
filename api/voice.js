'use strict';

const context = require('../models/context');

const TYPE = {PHONE: 'phone', DTMF: 'dtmf'};
const ACTION = {TALK: 'talk', INPUT: 'input', CONNECT: 'connect', RECORD: 'record'};
const TTS_TEXT = 'This is a text to speech call from Vonage';

const call = (req, res, next) => {
    try {
        const to = req.body.to || process.env.TO;
        const from = req.body.from || process.env.VIRTUAL_NUMBER;

        context.vonage.calls.create({
            to: [{
                type: TYPE.PHONE,
                number: to
            }],
            from: {
                type: TYPE.PHONE,
                number: from
            },
            ncco: [{
                "action": ACTION.TALK,
                "text": TTS_TEXT
            }]
        }, (err, res) => {
            if (err) console.error(err)
            if (res) {
                console.log(res);
                res.status(200).send(res);
            }
        });
        res.status(200).json(ncco);
    } catch (err) {
        next(err);
        return;
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
        next(err);
        return;
    }
}

const answer = (req, res, next) => {
    try {
        const ncco = [{
            action: ACTION.TALK,
            text: 'Hello, welcome to Acme Systems Incorporated\'s Interactive Voice Response System. To speak with Sales press 1. For Customer Support press 2. For the press office, press 3',
            bargeIn: true
        },
        {
            action: ACTION.INPUT,
            type: [TYPE.DTMF],
            eventUrl: [`${req.protocol}://${req.get('host')}/voice/dtmf`],
            maxDigits: 1
        }]
        res.status(200).json(ncco);
    } catch (err) {
        next(err);
        return;
    }
}

const dtmf = (req, res, next) => {
    try {
        const dtmf = req.body.dtmf
        let ncco;

        switch (dtmf) {
            case "1":
                ncco = [
                    {
                        action: ACTION.TALK,
                        text: `You have asked to speak with the Sales Department, Connecting you now.`
                    },
                    {
                        action: ACTION.CONNECT,
                        from: process.env.VIRTUAL_NUMBER,
                        endpoint: 
                        [
                            {
                                "type": TYPE.PHONE,
                                "number": process.env.VIRTUAL_NUMBER_SECOND
                            }
                        ]
                    }
                ]
                res.json(ncco)
                break;
            case "2":
                ncco = 
                [
                    {
                        action: ACTION.TALK,
                        text: 'You have asked to speak with customer service, please input your 5 digit account number followed by the pound sign'
                    },
                    {
                        action: 'input',
                        eventUrl: [`${base_url}/voice/account`],
                        timeOut: 10,
                        maxDigits: 6,
                        submitOnHash: true
                    }
                ]
                res.json(ncco)
                break;
            case "3":
                ncco =
                [
                    {
                        action: ACTION.TALK,
                        text: 'You have asked to speak with the press office. Unfortunately no one from the press office is currently available and the recording service has yet to be implemented, please try back later'
                    },
                    {
                        action: ACTION.RECORD,
                        beepStart: true,
                        eventUrl: [`${base_url}/voice/record`],
                        endOnSilence: 3
                    }
                ]
                res.json(ncco)
                break;
            default:
                ncco = [
                    {
                        action: ACTION.TALK,
                        text: 'I\'m sorry I didn\'t understand what you entered please try again'
                    }
                ];
                res.json(ncco);
                break;
            }

        } catch (err) {
            next(err);
            return;    
    }
}

const account = (req, res, next) => {
    try {
        const dtmf = req.body.dtmf
        const input = dtmf.split('').join(' ');
        const ncco = [
            {
                action: ACTION.TALK,
                text: 'Your account number is: ' + input + ' your case has been added and is being actively triaged, you will be contacted with an update to your case in 24 hours'
            }
        ];
        res.status(200).send(ncco);
    } catch (err) {
        next(err);
        return;
    }
}

const record = (req, res) =>{
    console.log(req.body.recording_url);
    res.status(200).send();
}

module.exports = {
    call,
    receive,
    answer,
    dtmf, 
    account
};