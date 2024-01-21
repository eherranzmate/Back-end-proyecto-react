const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const House = require('./api/models/house.model');

const arrayHouses = [
  {
    name: "Casa Stark",
    description: "La Casa Stark de Invernalia es una antigua y noble casa en el Norte de Poniente. Son conocidos por su lealtad, honor y la advertencia 'Se acerca el Invierno'.",
    foundation: "Edad Antigua"
    
  },
  {
    name: "Casa Lannister",
    description: "La Casa Lannister de Roca Casterly es famosa por su riqueza, astucia política y su lema poderoso: 'Oye mi rugido'.",
    foundation: "Edad Media"
  },
  {
    name: "Casa Targaryen",
    description: "La Casa Targaryen, de la antigua Valyria, es conocida por sus dragones y su linaje real. Su lema es 'Fuego y sangre'.",
    foundation: "Edad Antigua"
  },
  {
    name: "Casa Baratheon",
    description: "La Casa Baratheon de Bastión de Tormentas es reconocida por su fuerza y determinación. Su lema es 'Nuestra es la furia'.",
    foundation: "Edad Media"
  },
  {
    name: "Casa Tyrell",
    description: "La Casa Tyrell de Altojardín es conocida por su riqueza, elegancia y habilidad en la jardinería. Su lema es 'Crecer fuerte'.",
    foundation: "Edad Media"
  },
  {
    name: "Casa Greyjoy",
    description: "La Casa Greyjoy de Pyke es una casa marítima y guerrera, que sigue el lema 'Lo que está muerto no puede morir'.",
    foundation: "Edad Antigua"
  },
  {
    name: "Casa Arryn",
    description: "La Casa Arryn de Nido de Águilas es famosa por su ubicación montañosa y su lema 'Tan alto como el honor'.",
    foundation: "Edad Antigua"
  },
  {
    name: "Casa Martell",
    description: "La Casa Martell de Lanza del Sol es conocida por su resistencia en el desierto y su lema 'Nunca doblegado, nunca roto'.",
    foundation: "Edad Antigua"
  },
  {
    name: "Casa Tully",
    description: "La Casa Tully de Aguasdulces destaca por su lema 'Familia, deber, honor' y su conexión con el río Tridente.",
    foundation: "Edad Media"
  }
];

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allHouses = await House.find();
    if (allHouses.length > 0) {
      await House.collection.drop();
      console.log('Casas borradas');
    }
  })
  .catch((err) => {
    console.log('error borrando las casas', err);
  })
  .then(async () => {
    const houseMap = arrayHouses.map((house) => new House(house));
    await House.insertMany(houseMap);
    console.log('casas insertadas');
  })
  .catch((err) => {
    console.log('error insertando las casas', err);
  })
  .finally(() => mongoose.disconnect());
