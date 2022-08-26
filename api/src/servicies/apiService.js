const axios = require("axios");
const { API_KEY } = process.env;
const url = 'https://api.rawg.io/api/';

//Funcion para obtener los videojuegos desde la api
async function getVideogames(size) {
  try {
    let apiPromiseOne = await axios.get(
      `${url}games?key=${API_KEY}&page_size=${size}&page=17`
    );
    let apiPromiseTwo = await axios.get(apiPromiseOne.data.next)
    let apiPromiseThree = axios.get(apiPromiseTwo.data.next)
    const [apiResponseOne, apiResponseTwo, apiResponseThree] = await Promise.all([apiPromiseOne,apiPromiseTwo, apiPromiseThree])
    const fullResponse =  [...apiResponseOne.data.results, ...apiResponseTwo.data.results, ...apiResponseThree.data.results]
    return fullResponse;
  } catch (error) {
    throw new Error(
      "error en la peticion, no fue posible obtener los video juegos",
      error
    );
  }
}
//funcion para obtener los videojuegos de la api por nombre
async function getVideogamesByName(name, size) {
  try {
    let apiResponse = await axios.get(
      `${url}games?key=${API_KEY}&page_size=${size}&search=${name}`
    );
    return apiResponse.data.results;
  } catch (error) {
    throw new Error(
      "error en la peticion, no fue posible obtener los video juegos con ese nombre",
      error
    );
  }
}
//Funcion para obtener los videojuegos de la api por ID
async function getVideogameById(id) {
  try {
    let apiPromise = axios.get(`${url}games/${id}?key=${API_KEY}`);
    let screenshotsPromise = axios.get(`${url}games/${id}/screenshots?key=${API_KEY}`);
    let [ apiResponse, screenshotsResponse] = await Promise.all([apiPromise,screenshotsPromise]);
    return {...apiResponse.data, short_screenshots:screenshotsResponse.data.results}
  } catch (error) {
    throw new Error("No se encontro ningun video juego con ese id", error);
  }
}
//Funcion para obtener los generos de la api
async function getGenres() {
  try {
    let apiResponse = await axios.get(`${url}genres?key=${API_KEY}`);
    return apiResponse.data.results;
  } catch (error) {
    throw new Error("Algo salio mal con los generos mi perro", error);
  }
}
//Exportamos los modulos
module.exports = { getVideogames, getVideogamesByName, getVideogameById, getGenres };

