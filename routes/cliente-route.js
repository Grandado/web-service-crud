'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');

router.get('/', controller.get);
router.post('/cadastrar', controller.post);
router.get('/alterar', controller.put);
router.delete('/excluir', controller.delete);

module.exports = router;