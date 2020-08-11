import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 % error.response.status < 500;
  if (!expectedError) {
    toast.error("an unexpected error occured");
    logger.log(error);
  }
  return Promise.reject(error);
});

const getMovies = async () => {
  const { data } = await axios.get(`${config.apiEndpoint}/movies/`);
  return data;
};

const deleteMovie = async (movieID) => {
  const { data } = await axios.delete(
    `${config.apiEndpoint}/movies/${movieID}`
  );
  return data;
};

const getMovie = async (movieID) => {
  const { data } = await axios.get(`${config.apiEndpoint}/movies/${movieID}`);
  return data;
};

const saveMovie = async (data) => {
  let movie = { ...data };
  delete movie._id;
  if (data._id) {
    await axios.put(`${config.apiEndpoint}/movies/${data._id}`, movie);
  } else {
    await axios.post(`${config.apiEndpoint}/movies/`, movie);
  }
};

export default { getMovies, deleteMovie, getMovie, saveMovie };
