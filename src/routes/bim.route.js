const express = require('express');
const bimController = require('./../controllers/bim.controller');
const router = express.Router();

router.post('/upload', bimController.upload );

router.get('/search', bimController.search );

router.get('/list', bimController.list );

module.exports = router;