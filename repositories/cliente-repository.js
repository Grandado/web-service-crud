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
    const record = await session.run('MATCH(c:CLIENTE) RETURN c');
    return record.records.map((i) => {
      var res = i.get('c').properties;
      res.id = i.get('c').identity;
      return res;
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  /* const res = await Cliente.find(
    {},
    '_id nome email cpf cep rua numero complemento bairro cidade estado telefone celular nascimento'
  );
  return res; */
};

exports.putById = async (valor) => {
  try {
    console.log('valor:', valor);
    const result = await session.run(
      `MATCH (c:CLIENTE) 
      WHERE ID(c)=${valor.id}
      SET c.nome= '${valor.nome}', 
      c.email= '${valor.email}', 
      c.telefone = '${valor.telefone}',
      c.celular = '${valor.celular}',
      c.cpf = '${valor.cpf}',
      c.cep = '${valor.cep}',
      c.rua = '${valor.rua}',
      c.numero = ${valor.numero},
      c.complemento = '${valor.complemento}',
      c.bairro = '${valor.bairro}',
      c.estado = '${valor.estado}',
      c.cidade = '${valor.cidade}',
      c.nascimento = '${valor.nascimento}'`
    );
    console.log('putById:\n', result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
  //return result.records[0].get('c').properties;

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
  try {
    await session.run(
      `CREATE
    (c:CLIENTE {
    nome:'${dados.nome}',
    email:'${dados.email}',
    cpf:'${dados.cpf}',
    cep:'${dados.cep}',
    rua:'${dados.rua}',
    numero:${dados.numero},
    complemento:'${dados.complemento}',
    bairro:'${dados.bairro}',
    cidade:'${dados.cidade}',
    estado:'${dados.estado}',
    telefone:'${dados.telefone}',
    celular:'${dados.celular}',
    nascimento:'${dados.nascimento}'}) 
    RETURN c`
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
  /* await Cliente.init();
  const cliente = new Cliente(dados);
  await cliente.save(); */
};
exports.delete = async (id) => {
  try {
    await session.run(`MATCH (c:CLIENTE) WHERE ID(c)=${id} DELETE c`);
  } catch (err) {
    console.error(err);
    throw err;
  }
  //return await this.get();

  /* await Cliente.findByIdAndDelete(id); */
};
