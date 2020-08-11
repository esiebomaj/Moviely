import config from "../config.json";
import axios from "axios";

async function getGenres() {
  const { data } = await axios.get(`${config.apiEndpoint}/genres`);
  return data;
}
export default getGenres;
