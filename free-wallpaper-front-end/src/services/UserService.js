import axios from "../axios"

const signUpService = (data) => {
    return axios.post(`/user/sign-up`, data);
}

export const UserService = {
    signUpService
}
