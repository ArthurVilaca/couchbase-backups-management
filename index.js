const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('./util/uncaughtException')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// base requests router
const routes = require('./routes');
app.use('/', routes);

const server = require('http').Server(app);

// http server below
server.listen(4444, function () {
	console.log('listening on *:4444');
});
