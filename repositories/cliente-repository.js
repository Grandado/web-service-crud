'use strict';

const neo4j = require('neo4j-driver');
const config = require('../config');

const driver = neo4j.driver(
  config.uri,
  neo4j.auth.basic(config.user, config.password),
  { disableLosslessIntegers: true }
);

const session = driver.session({ database: 'neo4j' });

/* const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente'); */

exports.get = async () => {
  try {
    var res;
    const record = await session.run('MATCH(c:CLIENTE) RETURN c');
    record.records.forEach((i) => {
      res = i.get('c').properties;
      res.id = i.get('c').identity;
    });
    return res;
  } catch (err) {
    console.error(err);
  }

  //return result.records.map((i) => i.get('n').properties);

  /* const res = await Cliente.find(
    {},
    '_id nome email cpf cep rua numero complemento bairro cidade estado telefone celular nascimento'
  );
  return res; */
};

exports.putById = async (valor) => {
  const result = await session.run(
    `MATCH (u:CLIENTE {_id : '${id}'}) SET u.nome= '${valor.nome}', u.email= '${
      valor.email
    }', 
    u.telefone = '${valor.telefone}'
    u.celular = '${valor.celular}'
    u.cpf = '${valor.cpf}'
    u.cep = '${valor.cep}'
    u.rua = '${valor.rua}'
    u.numero = '${parseInt(valor.numero)}'
    u.complemento = '${valor.complemento}'
    u.bairro = '${valor.bairro}'
    u.estado = '${valor.estado}'
    u.cidade = '${valor.cidade}'
    u.nascimento = '${valor.nascimento}'
    return u`
  );
  return result.records[0].get('u').properties;

  /* await Cliente.findByIdAndUpdate(valor._id, {
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
  }); */
};

exports.post = async (dados) => {
  await session.run(
    `CREATE
  (c:CLIENTE {
  nome:'${dados.nome}',
  email:'${dados.email}',
  cpf:'${dados.cpf}',
  cep:'${dados.cep}',
  rua:'${dados.rua}',
  numero:'${dados.numero}',
  complemento:'${dados.complemento}',
  bairro:'${dados.bairro}',
  cidade:'${dados.cidade}',
  estado:'${dados.estado}',
  telefone:'${dados.telefone}',
  celular:'${dados.celular}',
  nascimento:'${dados.nascimento}'}) 
  RETURN c`
  );
  /* await Cliente.init();
  const cliente = new Cliente(dados);
  await cliente.save(); */
};
exports.delete = async (id) => {
  await session.run(`MATCH (c:CLIENTE {_id : '${id}'}) DELETE c`);
  //return await this.get();

  /* await Cliente.findByIdAndDelete(id); */
};
