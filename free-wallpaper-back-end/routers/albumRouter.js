const express = require('express');
const bodyParser = require('body-parser')

const albumRouter = express.Router();

albumRouter.use(bodyParser.json());

module.exports = {
    albumRouter
}