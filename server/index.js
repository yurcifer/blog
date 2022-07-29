const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const PORT = process.nextTick.PROT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

app.post('/checkAuth', (req, res) => {
  console.log('checkAuth request');
  const sessionCookie = req.cookies.session || '';
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then(() => {
      res.json({ auth: true });
    })
    .catch(error => {
      console.log('auth failed');
      res.json({ auth: false });
      res.status(401).send('UNAUTHORIZED REQUEST');
    });
});

app.post('/sessionLogin', (req, res) => {
  console.log('sessionLogin request');
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      sessionCookie => {
        const options = { maxAge: expiresIn, httpOnly: true, Path: '/' };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
      },
      error => {
        res.status(401).send('UNAUTHORIZED REQUEST');
      }
    );
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
