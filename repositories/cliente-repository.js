'use strict';
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async () => {
  const res = await Cliente.find(
    {},
    '_id nome email cpf cep rua numero complemento bairro cidade estado telefone celular nascimento'
  );
  return res;
};

exports.getIdByCPF = async (valor) => {
  const res = await Cliente.findOne({ cpf: valor }, '_id');
  return res;
};

exports.post = async (dados) => {
  await Cliente.init();
  const cliente = new Cliente(dados);
  await cliente.save();
};
exports.put = async () => {};
exports.delete = async () => {};
