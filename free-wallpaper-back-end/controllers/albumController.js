const db = require("../models");
const Album = require("../models/album");

// Hàm controller cho album
const albumController = {
    // Tạo album mới
    createAlbum: async (req, res) => {
        const { name, wallpapers, author } = req.body;

        try {
            const newAlbum = new Album({
                name,
                wallpapers,
                author
            });

            const savedAlbum = await newAlbum.save();
            res.status(201).json(savedAlbum);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Lấy danh sách tất cả album
    getAlbums: async (req, res) => {
        try {
            const albums = await Album.find();
            res.status(200).json(albums);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy thông tin album theo ID
    getAlbumById: async (req, res) => {
        const { id } = req.params;

        try {
            const album = await Album.findById(id);

            if (!album) {
                return res.status(404).json({ message: 'Album not found' });
            }

            res.status(200).json(album);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Cập nhật thông tin album theo ID
    updateAlbum: async (req, res) => {
        const { id } = req.params;
        const { name, wallpapers, author } = req.body;

        try {
            const updatedAlbum = await Album.findByIdAndUpdate(
                id,
                { name, wallpapers, author },
                { new: true }
            );

            if (!updatedAlbum) {
                return res.status(404).json({ message: 'Album not found' });
            }

            res.status(200).json(updatedAlbum);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xoá album theo ID
    deleteAlbum: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedAlbum = await Album.findByIdAndDelete(id);

            if (!deletedAlbum) {
                return res.status(404).json({ message: 'Album not found' });
            }

            res.status(200).json({ message: 'Album deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = albumController;