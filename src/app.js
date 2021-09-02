require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { CLIENT_BASEURL, CLIENT_PORT } = process.env;


const server = express();
server.name = 'delsur-api';

server.use(express.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${CLIENT_BASEURL}:${CLIENT_PORT}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

module.exports = server;
