import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

async function getGenres() {
  const { data } = await axios.get(`/genres`);
  return data;
}
export default getGenres;
