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
  // TODO: setup cors
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
      console.log('auth ok');
      res.status(200).send();
    })
    .catch(error => {
      console.log('auth failed');
      res.status(401).send();
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
      e => {
        res.status(401).send();
        console.log(e);
      }
    );
});

app.post('/sessionLogout', (req, res) => {
  console.log('sessionLogout request');

  try {
    res.clearCookie('session');
    res.end(JSON.stringify({ status: 'success' }));
  } catch (e) {
    res.status(401).send();
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
