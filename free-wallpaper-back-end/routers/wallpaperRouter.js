const express = require('express');
const bodyParser = require('body-parser')

const wallpaperRouter = express.Router();

wallpaperRouter.use(bodyParser.json());

module.exports = {
    wallpaperRouter
}