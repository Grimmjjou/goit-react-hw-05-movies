import axios from 'axios';
const API_KEY = '8250a012e9c5de27672edaa1917198ee';
const BASE_URL = 'https://api.themoviedb.org/3';

const TRENDING = '/trending/movie/day';
const MOVIE_DETAILS = '/movie';
const CAST = '/credits';
const REVIEWS = '/reviews';
const SEARCH = '/search/movie';

async function moviesTrending() {
  try {
    const fetchUrl = `${BASE_URL}${TRENDING}?api_key=${API_KEY}`;
    const response = await axios.get(fetchUrl);

    if (response) {
      return response.data.results;
    }

    return Promise.reject(new Error('Oops! Something went wrong...'));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function movieDetails(id) {
  try {
    const fetchUrl = `${BASE_URL}${MOVIE_DETAILS}/${id}?api_key=${API_KEY}`;
    const response = await axios.get(fetchUrl);

    if (response) {
      return response.data;
    }

    return Promise.reject(new Error('Oops! Something went wrong...'));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function Cast(id) {
  try {
    const fetchUrl = `${BASE_URL}${MOVIE_DETAILS}/${id}${CAST}?api_key=${API_KEY}`;
    const response = await axios.get(fetchUrl);

    if (response) {
      return response.data;
    }

    return Promise.reject(new Error('Oops! Something went wrong...'));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function reviews(id) {
  try {
    const fetchUrl = `${BASE_URL}${MOVIE_DETAILS}/${id}${REVIEWS}?api_key=${API_KEY}`;
    const response = await axios.get(fetchUrl);

    if (response) {
      return response.data;
    }

    return Promise.reject(new Error('Oops! Something went wrong...'));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function searchMovies(query) {
  try {
    const fetchUrl = `${BASE_URL}${SEARCH}?api_key=${API_KEY}&query=${query}`;
    const response = await axios.get(fetchUrl);

    if (response) {
      return response.data;
    }

    return Promise.reject(new Error('Oops! Something went wrong...'));
  } catch (error) {
    throw new Error(error.message);
  }
}

const movieAPI = {
  moviesTrending,
  movieDetails,
  Cast,
  reviews,
  searchMovies,
};

export default movieAPI;
