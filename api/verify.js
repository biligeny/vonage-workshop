'use strict';

const context = require('../models/context');

const start = async (req, res, next) => {
   // console.log(new Date());
    try {
        const to = req.body.to || process.env.TO_NUMBER;
        const brand = req.body.brand || process.env.BRAND_NAME;
        console.log(to);

        await context.vonage.verify.start({
            number: "819065185577",
            senderId: "brand"
        }).then(resp => {
            console.log(resp.request_id);
            res.status(200).send(resp.request_id);
        }).catch(err => console.error(err));
    } catch (err) {
        console.log(new Date());

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