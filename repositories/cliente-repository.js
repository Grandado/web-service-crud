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

exports.putById = async (valor) => {
  await Cliente.findByIdAndUpdate(valor._id, {
    $set: {
      nome: valor.nome,
      email: valor.email,
      telefone: valor.telefone,
      celular: valor.celular,
      cpf: valor.cpf,
      cep: valor.cep,
      rua: valor.rua,
      numero: valor.numero,
      complemento: valor.complemento,
      bairro: valor.bairro,
      estado: valor.estado,
      cidade: valor.cidade,
      nascimento: valor.nascimento,
    },
  });
};

exports.post = async (dados) => {
  await Cliente.init();
  const cliente = new Cliente(dados);
  await cliente.save();
};
exports.delete = async (id) => {
  await Cliente.findByIdAndDelete(id);
};
