import axios from "axios";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(tokenKey);

export async function login(email, password) {
  const { data: jwt } = await axios.post(`/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (errors) {
    return null;
  }
};

export default {
  logout,
  login,
  getCurrentUser,
  loginWithJWT,
};
