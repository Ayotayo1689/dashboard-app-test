import axios from "axios"

const API_URL = "https://dummyjson.com/auth"

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  })
console.log(response.data);

  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem("user")
}

export default {
  login,
  logout,
}

