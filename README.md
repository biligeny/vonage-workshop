# Node.js Vonage voice and SMS sample for Google App Engine

This sample shows how to use [Vonage](https://www.vonage.com/) on
[Google App Engine](https://cloud.google.com/appengine) Node.js [standard environment](https://cloud.google.com/appengine/docs/standard/nodejs)
and [flexible environment](https://cloud.google.com/appengine/docs/flexible/nodejs)

For more information about Vonage, see the
[Vonage SDK library](https://developer.vonage.com).

## Setup

Before you can run or deploy the sample, you will need to do the following:

1. [Create a Vonage Account](https://dashboard.nexmo.com/sign-up).

2. [Buy a number on Vonage](https://dashboard.nexmo.com/buy-numbers), and configure the voice request URL to be
`https://<your-project-id>.appspot.com/call/receive` and the SMS request URL to
be `https://<your-project-id>.appspot.com/sms/receive`.

3. Configure your Vonage settings in the environment variables section in `app.yaml-example` and rename to `app.yaml`.

## Running locally

Refer to the [appengine/README.md](../README.md) file for instructions on
running and deploying.

You can run the application locally to test the callbacks and SMS sending. You
will need to set environment variables before starting your application:

    export TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
    export TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
    export TWILIO_NUMBER=<your-twilio-number>
    npm start


# Quickstart for Node.js in the App Engine standard environment

This is the sample application for the
[Quickstart for Node.js in the App Engine standard environment][tutorial]
tutorial found in the [Google App Engine Node.js standard environment][appengine]
documentation.

* [Setup](#setup)
* [Running locally](#running-locally)
* [Deploying to App Engine](#deploying-to-app-engine)
* [Running the tests](#running-the-tests)

## Setup

Before you can run or deploy the sample, you need to do the following:

1.  Refer to the [appengine/README.md][readme] file for instructions on
    running and deploying.
1.  Install dependencies:

        npm install

## Running locally

    npm start

## Deploying to App Engine

    gcloud app deploy

## Running the tests

See [Contributing][contributing].

[appengine]: https://cloud.google.com/appengine/docs/standard/nodejs
[tutorial]: https://cloud.google.com/appengine/docs/standard/nodejs/quickstart
[readme]: ../../README.md
[contributing]: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/main/CONTRIBUTING.md


