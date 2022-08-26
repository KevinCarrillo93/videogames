const { getVideogames, getVideogamesByName, getVideogameById, getGenres } = require('../servicies/apiService');
const { getDBVideoGames, getDBVideoGamesByName, getDBVideoGamesById } = require('../servicies/dbService');
const { Videogame, Genre } = require("../db");

const VGnumber = 100;
const VGnumberName = 15;

//Funcion para controlar  tanto lo que llega por DB como por la API y hacer un merge
async function getVG() {
  let dbResponse = await getDBVideoGames();
  if (dbResponse.length < VGnumber) {
    let apiResponse = await getVideogames(VGnumber - dbResponse.length);
    let fullResponse = [...dbResponse, ...apiResponse];
    return fullResponse;
  } else return dbResponse;
}
//Funcion para controlar  tanto lo que llega por DB como por la API y hacer un merge segun el nombre dado
async function getVGByName(name) {
  let dbResponse = await getDBVideoGamesByName(name);
  if (dbResponse.length < VGnumberName) {
    let apiResponse = await getVideogamesByName(
      name,
      VGnumberName - dbResponse.length
    );
    let fullResponse = [...dbResponse, ...apiResponse];
    return fullResponse;
  } else return dbResponse;
}
//Funcion para controlar  tanto lo que llega por DB como por la API y hacer un merge segun el ID dado
async function getVGById(id) {
  if (id.includes('-')) {
    let dbResponse = await getDBVideoGamesById(id);
    if (dbResponse) {
      return dbResponse;
    } else {
      let apiResponse = await getVideogameById(id);
      return apiResponse;
    }
  } else {
    let apiResponse = await getVideogameById(id);
    return apiResponse;
  }
}
//Funcion para controlar que se almacenen mis datos de la api en la DB
async function addGenreDB() {
  try {
    const dbResponse = await Genre.findAll();
    if(dbResponse.length>1){
      return dbResponse
    }else{
      let apiResponse = await getGenres();
      let genresArr = apiResponse.map((e) => ({ id: e.id, name: e.name }));
      let genres = await Genre.bulkCreate(genresArr);
      return genres;
    }
  } catch (error) {
    throw new Error("paila al crear la tabla de genres", error);
  }
}
//Exportamos los modulos
module.exports = { getVG, getVGByName, getVGById, addGenreDB }