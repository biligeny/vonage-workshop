'use strict';

const express = require('express');
const Vonage = require('@vonage/server-sdk');

class Context {
    constructor (key, secret) {
        this.vonage = new Vonage({
            apiKey: key,
            apiSecret: secret
        });
    }
}

const {API_KEY} = process.env;
const {API_SECRET} = process.env;

if (!API_KEY || !API_SECRET) {
    console.log('Please configure environment variables as described in README.md');
    throw new Error('Please configure environment variables as described in README.md');
}

module.exports = new Context(API_KEY, API_SECRET);