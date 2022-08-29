const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description_raw: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      background_image: {
        type: DataTypes.STRING,
        defaultValue: "https://cdn.wallpapersafari.com/92/53/F6zTbK.jpg",
      },
      released: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      short_screenshots: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [
          { image: "https://www.teahub.io/photos/full/27-270327_best-video-game.jpg" },
          { image: "https://static.alphacoders.com/thumbs_categories/32.jpg" },
          { image: "https://cdn.wallpapersafari.com/72/27/Kn5Dz2.jpg" },
          { image: "https://assets.deadbydaylight.com/DBD_Website_Keyart_d3b7a9628d.jpg" },
        ],
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
