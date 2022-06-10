'use strict';

const repository = require('../repositories/cliente-repository');

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar a requisição' });
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
exports.put = async (req, res, next) => {
  try {
    const data = await repository.getIdByCPF(req.body.cpf);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar a requisição' });
  }
};
exports.delete = async (req, res, next) => {};
