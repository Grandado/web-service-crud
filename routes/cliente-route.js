'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');

router.get('/all', controller.get);
router.post('/cadastrar', controller.post);
router.post('/alterar', controller.alterar);
router.post('/excluir', controller.delete);

module.exports = router;