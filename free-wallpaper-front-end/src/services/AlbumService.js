import axios from "../axios"

const getAllAlbumByAuthorService = (authorId) => {
    return axios.get(`/album/user/${authorId}`)
}
const getAlbumByIdService = (albumId) => {
    return axios.get(`/album/${albumId}`)
}
const createAlbum = (albumData) => {
    return axios.post(`/album`, albumData)
}
const deleteAlbumbyId = (albumId) => {
    return axios.delete(`/album/${albumId}`)
}

export const AlbumService = {
    getAllAlbumByAuthorService,
    getAlbumByIdService,
    createAlbum,
    deleteAlbumbyId
}
