const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

// TODO: Automatically load routes based on name of file under ./controllers/
const authenticationRouter = require('./controllers/authentication');
app.use('/authentication', authenticationRouter);

const policiesRouter = require('./controllers/policies');
app.use('/policies', policiesRouter);

const usersRouter = require('./controllers/users');
app.use('/users', usersRouter);

app.listen(port, () =>
  console.log(`Insurance Information listening at http://localhost:${port}`),
);
