'use strict';

const context = require('../models/context');

const request = (req, res, next) => {
    try {
        const to = req.body.to || process.env.TO_NUMBER;
        const brand = req.body.brand || process.env.BRAND_NAME;

        context.vonage.verify.request({
            number: to,
            brand: brand
        }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                const verifyRequestId = result.request_id;
                console.log('request_id', verifyRequestId);
                res.status(200).send('request_id: ' + verifyRequestId);
            }
        });
    } catch (err) {
        next(err);
        return;
    }
};

const check = (req, res, next) => {
    try {
        const id = req.body.id || process.env.REQUEST_ID;
        const code = req.body.code || process.env.VERIFY_CODE;
        context.vonage.verify.check({
            request_id: id,
            code: code
        }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
                res.status(200).send(result);
            }
        });
    } catch (err) {
        next(err);
        return;
    }
};

module.exports = {
    request,
    check
};