const express = require('express');
const app = express();

const BodyParser = require('body-parser');
app.use(BodyParser.json());

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

// TODO: Automatically load routes based on name of file under ./controllers/
const authenticationRouter = require('./controllers/authentication');
app.use('/authentication', authenticationRouter);

const policiesRouter = require('./controllers/policies');
app.use('/policies', policiesRouter);

const clientsRouter = require('./controllers/clients');
app.use('/clients', clientsRouter);

const { ValidationError } = require('express-validation');
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(403).json(err);
  }
  return res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`Insurance Information listening at http://localhost:${port}`);
});

module.exports = app;
