import axios from "../axios"

const getAllTag = () => {
    return axios.get("/tag/all");
}

const getTagsByKeyService = (key) => {
    return axios.get(`/tag/key/${key}`);
}


export const TagService = {
    getAllTag,
    getTagsByKeyService
}
