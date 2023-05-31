const express = require('express');
const app = express();
const errorHandler = require('./_helpers/error-handler');

app.use(express.json());

app.use(express.static(__dirname + "/client"));

// api routes
app.use('/hoa', require('./hoa/hoa.controller'));

// global error handler
app.use(errorHandler);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/client/PageNotFound.html');
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));