const express = require('express');
const albumRouter = express.Router();
const albumController = require('../controllers/albumController');

// Tạo một album mới 
albumRouter.post('/', albumController.createAlbum);
// Lấy danh sách tất cả các album, giới hạn 3 album đầu tiên với 3 ảnh đầu làm placeholder cho mỗi album 
albumRouter.get('/', albumController.getAlbums);
// Lấy thông tin chi tiết của một album dựa trên ID của album đó 
albumRouter.get('/:id', albumController.getAlbumById); 
// Cập nhật tên của một album dựa trên ID của album đó 
albumRouter.put('/:id', albumController.updateAlbum);
// Xóa một album dựa trên ID của album đó 
albumRouter.delete('/:id', albumController.deleteAlbum);
// Lấy danh sách các album của một người dùng dựa trên ID của người dùng đó 
albumRouter.get('/user/:userId', albumController.getAlbumsByUser);
// Share album
albumRouter.post('/share', albumController.shareAlbum);
module.exports = {
    albumRouter
};