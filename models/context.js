'use strict';

const { Vonage } = require('@vonage/server-sdk');

const {
	API_KEY,
	API_SECRET,
	BRAND_NAME,
	APPLICATION_ID,
	PRIVATE_KEY_PATH,
	TO_NUMBER,
	VONAGE_NUMBER,
	SECOND_NUMBER,
	VERIFY_CODE,
	REQUEST_ID,
} = process.env;

class Context {
	constructor(api_key, api_secret, applicaion_id, private_key) {
		this.vonage = new Vonage(
			{
				apiKey: api_key,
				apiSecret: api_secret,
				applicationId: applicaion_id,
				privateKey: private_key,
			},
			{ debug: true }
		);
	}
}

if (!API_KEY || !API_SECRET || !APPLICATION_ID || !PRIVATE_KEY_PATH || !VONAGE_NUMBER) {
	console.log('Please configure environment variables as described in README.md');
	throw new Error('Please configure environment variables as described in README.md');
}

module.exports = new Context(API_KEY, API_SECRET, APPLICATION_ID, PRIVATE_KEY_PATH);
