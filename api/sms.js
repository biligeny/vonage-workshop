'use strict';

const context = require('../models/context');

const message = 'A text message sent using the Vonage SMS API';

const send = (req, res, next) => {
    try {
        const from = req.body.from || process.env.FROM_NUMBER;
        const to = req.body.to || process.env.TO_NUMBER;
        const text = req.body.text || message;

        context.vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if (responseData.messages[0]['status'] === '0') {
                    console.log('Message sent successfully.');
                    res.status(200).send('Message sent successfully.');
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        });
    } catch (err) {
        next(err);
        return;
    }
}

const receive = (req, res) => {
    const params = Object.assign(request.query, request.body);
    console.log(params);
    response.status(204).send(params);
}

const dlr = (req, res) => {
    const params = Object.assign(request.query, request.body)
    console.log(params);
    response.status(204).send(params);
}

module.exports = {
    send,
    receive,
    dlr
};