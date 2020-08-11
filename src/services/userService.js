import config from "../config.json";
import axios from "axios";

export async function register(data) {
  const user = {};
  user.email = data.username;
  user.name = data.name;
  user.password = data.password;
  return await axios.post(`${config.apiEndpoint}/users`, user);
}
