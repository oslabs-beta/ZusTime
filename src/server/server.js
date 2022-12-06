// necessary required modules
const express = require('express');
const path = require('path');
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// port information
const app = express();
const PORT = 3000;

// json
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// catch all
app.use((req, res) => res.status(404).send('Page not found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Global Error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured caught in global error handler' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

// starting server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}! Welcome to Group 6's OSP`);
});

module.exports = app;
