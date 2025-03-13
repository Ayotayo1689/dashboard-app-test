import axios from "axios"

const API_URL = "https://dummyjson.com/users"

// Get authenticated axios instance
const authAxios = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  })
  return instance
}

const getUsers = async () => {
  const response = await authAxios().get(API_URL)
  return response.data
}

const searchUsers = async (query) => {
  const response = await authAxios().get(`${API_URL}/search?q=${query}`)
  return response.data
}

const getUserById = async (id) => {
  const response = await authAxios().get(`${API_URL}/${id}`)
  return response.data
}

export default {
  getUsers,
  searchUsers,
  getUserById,
}

