const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

//Funcion para obtener los videojuegos que estan en la base de datos
async function getDBVideoGames() {
  try {
    const response = Videogame.findAll({
      limit: 100,
      include: Genre 
    });
    return response;
  } catch (error) {
    throw new Error("Hubo un problema con la consulta ", error);
  }
}
// Funcion para obtener los videojuegos de la base de datos por nombre
async function getDBVideoGamesByName(name) {
  try {
    const response = Videogame.findAll({
      limit: 15,
      include: Genre,
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
    return response;
  } catch (error) {
    throw new Error("Hubo un problema con la consulta ", error);
  }
}
// Funcion para obtener los videojuegos de la base de datos por ID
async function getDBVideoGamesById(id) {
  try {
    const response = Videogame.findByPk(id, {
      include: Genre
    });
    return response;
  } catch (error) {
    throw new Error("No se encontro video juego con ese id", error);
  }
}

//Exportamos los modulos
module.exports = { getDBVideoGames, getDBVideoGamesByName, getDBVideoGamesById };
