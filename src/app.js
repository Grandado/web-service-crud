'use strict';

const express = require('express');
//const mongoose = require('mongoose');
//const config = require('../config');

const app = express();
const router = express.Router();

//Conecta ao Banco
//mongoose.connect(config.connectionString);

// Carrega os Models
const Cliente = require('../models/cliente');

// Carrega as Rotas
const indexRoute = require('../routes/index-route');
const clienteRoute = require('../routes/cliente-route');

app.use(
  express.json({
    limit: '5mb',
  })
);
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/cliente', clienteRoute);

module.exports = app;
