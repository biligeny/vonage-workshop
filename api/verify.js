'use strict';

const context = require('../models/context');

const start = async (req, res, next) => {
    try {
        const to = req.body.to || process.env.TO_NUMBER;
        const brand = req.body.brand || process.env.BRAND_NAME;

        await context.vonage.verify.start({
            number: to,
            brand: brand
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

        context.vonage.verify.check(id, code)
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
    start,
    check
};