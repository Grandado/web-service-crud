'use strict';

const repository = require('../repositories/cliente-repository');

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res
      .status(500)
      .send({ message: 'Falha ao processar a requisição. Erro: ' + e });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.post(req.body);
    res.status(200).send({ message: 'Cliente cadastrado' });
  } catch (e) {
    res.status(500).send({
      message: e.toString().includes('duplicate key')
        ? 'CPF duplicado, cliente já cadastrado!'
        : 'Falha ao processar a requisição: ' + e,
    });
  }
};

exports.alterar = async (req, res, next) => {
  try {
    await repository.putById(req.body);
    res.status(200).send({ message: 'Cliente alterado!' });
  } catch (e) {
    res
      .status(500)
      .send({ message: 'Falha ao processar a requisição. Erro: ' + e });
  }
};
exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({ message: 'Cliente Excluido' });
  } catch (e) {
    res
      .status(500)
      .send({ message: 'Falha ao processar a requisição. Erro: ' + e });
  }
};
