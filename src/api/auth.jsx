import axios from 'axios';

const BASE_URL = "" ; //PUT YOUR API URL HERE.

export async function userSignUp(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data)
}


export async function userSignin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data)
}