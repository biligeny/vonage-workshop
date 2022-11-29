'use strict';

const context = require('../models/context');

const message = 'A text message sent using the Vonage SMS API';

const send = async (req, res, next) => {
    try {
        const from = req.body.from || process.env.VONAGE_NUMBER;
        const to = req.body.to || process.env.TO_NUMBER;
        const encode = req.body.encode || process.env.ENCODE_TYPE;
        const text = req.body.text || message;

        await context.vonage.sms.send({ to, from, text })
            .then(resp => {
                console.log(resp);
                res.status(200).send(resp);
            })
            .catch(err => { console.error(err); });
    } catch (err) {
        return next(err);
    }
}

const receive = (req, res) => {
    const params = Object.assign(req.query, req.body);
    console.log(params);
    res.status(204).send(params);
}

const dlr = (req, res) => {
    const params = Object.assign(req.query, req.body);
    console.log(params);
    res.status(204).send(params);
}

module.exports = {
    send,
    receive,
    dlr
};