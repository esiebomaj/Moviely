import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function register(data) {
  const user = {};
  user.email = data.username;
  user.name = data.name;
  user.password = data.password;
  return await axios.post(`/users`, user);
}
