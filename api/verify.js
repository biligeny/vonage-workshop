'use strict';

const context = require('../models/context');

const request = (req, res, next) => {
    try {
        const to = req.body.to || process.env.TO_NUMBER;
        const brand = req.body.brand || process.env.BRAND_NAME;

        context.vonage.verify.start({
            number: to,
            senderId: brand
        }).then(resp => {
            console.log(resp.request_id);
            res.status(200).send(resp.request_id);
        }).catch(err => console.error(err));
    } catch (err) {
        return next(err);
    }
};

const check = (req, res, next) => {
    try {
        const id = req.body.id || process.env.REQUEST_ID;
        const code = req.body.code || process.env.VERIFY_CODE;

        vonage.verify.check(id, code)
            .then(resp => {
                console.log(resp);
                res.status(200).send(resp);
            })
            .catch(err => console.error(err));
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    request,
    check
};