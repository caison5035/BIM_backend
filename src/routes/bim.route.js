const express = require('express');
const bimController = require('./../controllers/bim.controller');
const router = express.Router();

router.post('/upload', bimController.upload );

router.post('/tag', bimController.tag );

module.exports = router;