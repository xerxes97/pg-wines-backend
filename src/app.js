const path = require('path');
require('dotenv').config();
const routes = require('./routes');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// Settings for let access the localhost:3000 front-end app (using cors middleware)
const config = {
  application: {
      cors: {
          server: [
              {
                  origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                  credentials: true
              }
          ]
      }
  }
};

const server = express();
server.name = 'delsur-api';

server.set('json spaces', 2);
// Middlewares
server.use(cors(
  config.application.cors.server
));
server.use(express.json());
server.use(morgan('dev'));

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "../client")));
}

server.use('/', routes);

module.exports = server;
