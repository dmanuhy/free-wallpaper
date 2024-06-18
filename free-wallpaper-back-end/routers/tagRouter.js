const express = require('express');
const bodyParser = require('body-parser')

const tagRouter = express.Router();

tagRouter.use(bodyParser.json());

module.exports = {
    tagRouter
}