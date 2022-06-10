'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  cpf: { type: String, required: true, unique: true, index: true },
  cep: { type: String, required: true },
  rua: { type: String, required: true, trim: true },
  numero: { type: Number, required: false },
  complemento: { type: String, required: false, trim: true },
  bairro: { type: String, required: false, trim: true },
  cidade: { type: String, required: false },
  estado: { type: String, required: false },
  telefone: { type: String, required: false },
  celular: { type: String, required: false },
  nascimento: { type: String, required: false },
});

module.exports = mongoose.model('Cliente', schema);
