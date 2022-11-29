'use strict';

const express = require('express');
const uuid = require('uuid');
const app = express();

const sms = require('./routes/sms');
const verify = require('./routes/verify');
const voice = require('./routes/voice');

app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.status(200).send('Welcome to Vonage API workshop: ' + uuid.v1() + ' - ' + new Date());
});

app.use('/sms', sms);
app.use('/verify', verify);
app.use('/voice', voice);

if (module === require.main) {
   const PORT = parseInt(process.env.PORT) || 3000;
   app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
   });
}

module.exports = app;