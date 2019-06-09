/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
// requires the following modules to be used in the app
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { check, validationResult } = require('express-validator/check');
const mongojs = require('mongojs');

const db = mongojs('customersApp', ['users']);

const app = express();

let mErrors = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.title = 'CustomersApp';
  next();
});

// set the view apth and view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

let users;

app.delete('/delete/:id', (req, res) => {
  // eslint-disable-next-line no-undef
  db.users.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, success) => {
    if (err) console.log(err);
    if (success) res.redirect('/');
  });
});

app.get('/', (req, res) => {
  db.users.find((err, docs) => {
    if (err) console.log(err);
    users = docs.map(x => x);
    res.render('index', { usersList: users, errors: mErrors });
    mErrors = null;
  });
});

app.post('/posts/user', [check('firstname').not().isEmpty().withMessage('firstname is required'),
check('lastname').not().isEmpty().withMessage('lastname is required'),
check('email').isEmail().withMessage('enter a valid email address')], (req, res) => {
  // eslint-disable-next-line no-var
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    mErrors = errors.array();
    res.redirect('/');
  } else {
    const newUser = {
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email
    };
    db.users.insert(newUser, (err, result) => {
      if (err) console.log(err);
      if (result) res.redirect('/');
      });
    }
  });
app.listen(3000);
