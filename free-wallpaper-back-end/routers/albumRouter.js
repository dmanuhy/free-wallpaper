const express = require('express');
const albumRouter = express.Router();
const albumController = require('../controllers/albumController');


albumRouter.post('/', albumController.createAlbum);
// albumRouter.get('/', albumController.getAlbums);
albumRouter.get('/:id', albumController.getAlbumById);
albumRouter.put('/:id', albumController.updateAlbum);
albumRouter.delete('/:id', albumController.deleteAlbum);
albumRouter.get('/user/:userId', albumController.getAlbumsByUser);

module.exports = {
    albumRouter
};