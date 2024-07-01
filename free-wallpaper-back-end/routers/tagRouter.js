const express = require('express');
const bodyParser = require('body-parser');
const { tagController } = require('../controllers');

const tagRouter = express.Router();

tagRouter.use(bodyParser.json());

tagRouter.get("/all", tagController.getAllTag);

module.exports = {
    tagRouter
}