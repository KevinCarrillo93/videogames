const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame } = require('../db');
const { getVG, getVGByName, getVGById, addGenreDB } = require('../controllers/viedogameController');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      res.json(await getVGByName(name));
    } catch (error) {
      res.status(404).send("Error en la ruta :v", error);
    }
  } else {
    try {
      res.json(await getVG());
    } catch (error) {
      res.status(404).send("Error en la ruta :v", error);
    }
  }
});

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await getVGById(id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/genres", async (req, res) => {
  try {
    let getGenres = await addGenreDB();
    res.json(getGenres);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/videogames", async (req, res) => {
  try {
    const { name, description_raw, released, rating, platforms, genres, background_image } =
      req.body;
    if (!name || !description_raw || !platforms)
      return res
        .status(400)
        .send("Paila papi, necesitamos si o si los parametros");

    const createVideogame = await Videogame.create({
      name,
      description_raw,
      released,
      rating,
      platforms,
      background_image
    });
    await createVideogame.addGenre(genres);
    res.send(createVideogame);
  } catch (error) {
    return res.status(404).send("algo paso en el post papi");
  }
});

module.exports = router;
