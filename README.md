# Node.js Vonage SMS and Voice sample for Google App Engine

This sample shows how to use [Vonage](https://www.vonage.com/) on
[Google App Engine](https://cloud.google.com/appengine) Node.js [standard environment](https://cloud.google.com/appengine/docs/standard/nodejs)
and [flexible environment](https://cloud.google.com/appengine/docs/flexible/nodejs)

For more information about Vonage, see the
[Vonage SDK library](https://developer.vonage.com).

## Setup

Before you can run or deploy the sample, you will need to [Do The Following:](https://developer.vonage.com/messaging/sms/code-snippets/before-you-begin)

1. Create a Vonage Account
2. Rent a Vonage Number

## Webhooks

1. Configure the [Voice Receive](https://<your-project-id>.appspot.com/call/receive) and [SMS Inbound](https://<your-project-id>.appspot.com/sms/receive) Webhook - If you deploy to the GCP.

2. See [Using Ngrok for local development](https://developer.vonage.com/tools/ngrok) for details of how to set up and use Ngrok.

## Configure Environment Variables

1. Configure your Vonage settings in the environment variables section in `app.yaml-example` and rename to `app.yaml`.

2. Export your Vonage settings in `app.sh-example` and rename to `app.sh` if you want run this in local development.

# Quickstart for Node.js in the App Engine standard environment

This is the sample application for the
[Quickstart for Node.js in the App Engine standard environment][tutorial]
tutorial found in the [Google App Engine Node.js standard environment][appengine]
documentation.

* [Deploying to App Engine](#deploying-to-app-engine)
* [Running locally](#running-locally)
* [Testing the service](#Testing-the-Service)

## Install dependencies

    $ npm install

## Deploying to App Engine

    $ gcloud app deploy
    $ gclould app browse

## Running locally

    $ source ./app.sh
    $ npm start


## Testing the Service
