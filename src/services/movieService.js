import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
  const { data } = await axios.get(`/movies/`);
  return data;
};

const deleteMovie = async (movieID) => {
  const { data } = await axios.delete(`/movies/${movieID}`);
  return data;
};

const getMovie = async (movieID) => {
  const { data } = await axios.get(`/movies/${movieID}`);
  return data;
};

const saveMovie = async (data) => {
  let movie = { ...data };
  delete movie._id;
  if (data._id) {
    await axios.put(`/movies/${data._id}`, movie);
  } else {
    await axios.post(`/movies/`, movie);
  }
};

export default { getMovies, deleteMovie, getMovie, saveMovie };
