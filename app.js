'use strict';

const express = require('express');
const uuid = require('uuid');
const app = express();

const verify = require('./routes/verify');
const sms = require('./routes/sms');

app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
   res.status(200).send('Welcome to Vonage API workshop: ' + uuid.v1());
});

app.use('/verify', verify);
app.use('/sms', sms);

if (module === require.main) {
   const PORT = parseInt(process.env.PORT) || 8080;
   app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      console.log('Press Ctrl+C to quit.');
   });
}

module.exports = app;