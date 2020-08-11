import config from "../config.json";
import axios from "axios";
import Logout from "./../components/logout";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
export async function login(email, password) {
  const { jwt } = await axios.post(`${config.apiEndpoint}/auth`, {
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
  Logout,
  login,
  getCurrentUser,
  loginWithJWT,
};
