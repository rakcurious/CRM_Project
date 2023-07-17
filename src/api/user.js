import axios from "axios";

const BASE_URL = "" ; //PUT YOUR API URL HERE.

export async function getAllUsers(userId) {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/users/${userId}`,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}


export async function userUpdation (userId, currentUser) {
    return await axios.put(`${BASE_URL}/crm/api/v1/users/${userId}`, currentUser, {
        headers: {
            'x-access-token' : localStorage.getItem('token')
        }
    }, 
    {
        'userId' : localStorage.getItem('userId')
    })
}