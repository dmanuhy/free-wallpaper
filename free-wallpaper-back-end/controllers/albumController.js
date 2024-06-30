const db = require("../models");
const Album = require("../models/album");

// Create a new album
const createAlbum = async (req, res) => {
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
};

// Get all albums
const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find().limit(3).populate('wallpapers').populate('author');
        const albumsWithThumbnails = albums.map(album => {
            const thumbnails = album.wallpapers.slice(0, 3);
            return {
                ...album.toObject(),
                thumbnails
            };
        });
        res.status(200).json(albumsWithThumbnails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get a single album by ID
const getAlbumById = async (req, res) => {
    const { id } = req.params;

    try {
        const album = await Album.findById(id).populate('wallpapers').populate('author');

        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an album by ID
const updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedAlbum = await Album.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedAlbum) {
            return res.status(404).json({ message: 'Album not found' });
        }

        res.status(200).json(updatedAlbum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an album by ID
const deleteAlbum = async (req, res) => {
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
};

// Get albums by user ID
const getAlbumsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const albums = await Album.find({ author: userId }).populate('wallpapers').populate('author');
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    getAlbumsByUser
};