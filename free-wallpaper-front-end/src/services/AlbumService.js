import axios from "../axios"

const getAllAlbumByAuthorService = (authorId) => {
    return axios.get(`/album/user/${authorId}`)
}
const getAlbumByIdService = (albumId) => {
    return axios.get(`/album/${albumId}`)
}
const createAlbum = (albumData) => {
    return axios.post(`/album`,albumData)
}

export const AlbumService = {
    getAllAlbumByAuthorService,
    getAlbumByIdService,
    createAlbum
}
