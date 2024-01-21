const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Character = require('./api/models/character.model')
    
const charcatersData = [
  {
    "name": "Jon Snow",
    "actor": "Kit Harington",
    "description": "Bastardo de la familia Stark, conocido por su valentía y honor. Más tarde, se revela su verdadera identidad como Aegon Targaryen.",
    "house": "Stark"
  },
  {
    "name": "Daenerys Targaryen",
    "actor": "Emilia Clarke",
    "description": "Última descendiente de la Casa Targaryen, Madre de Dragones, liberadora de esclavos y aspirante al Trono de Hierro."
  },
  {
    "name": "Tyrion Lannister",
    "actor": "Peter Dinklage",
    "description": "Enano y miembro de la Casa Lannister, conocido por su astucia y perspicacia. Ha ocupado cargos importantes en el gobierno."
  },
  {
    "name": "Arya Stark",
    "actor": "Maisie Williams",
    "description": "Hija menor de la familia Stark, entrenada como asesina. Busca venganza por la muerte de su familia."
  },
  {
    "name": "Cersei Lannister",
    "actor": "Lena Headey",
    "description": "Reina y miembro de la Casa Lannister, conocida por su ambición y tácticas maquiavélicas para mantener el poder."
  },
  {
    "name": "Sansa Stark",
    "actor": "Sophie Turner",
    "description": "Hija mayor de la familia Stark, ha experimentado un desarrollo significativo desde una joven ingenua hasta una líder fuerte."
  },
  {
    "name": "Jaime Lannister",
    "actor": "Nikolaj Coster-Waldau",
    "description": "Hijo de la Casa Lannister, conocido como el 'Kingslayer'. Experimenta una evolución moral a lo largo de la serie."
  },
  {
    "name": "Bran Stark",
    "actor": "Isaac Hempstead Wright",
    "description": "Hijo menor de la familia Stark, desarrolla habilidades de videncia y se convierte en el Cuervo de Tres Ojos."
  },
  {
    "name": "Robb Stark",
    "actor": "Richard Madden",
    "description": "Hijo mayor de la familia Stark y Rey en el Norte. Conocido por su valentía y habilidades tácticas en la guerra."
  },
  {
    "name": "Catelyn Stark",
    "actor": "Michelle Fairley",
    "description": "Matriarca de la familia Stark, fuerte y protectora de sus hijos. Su muerte desencadena eventos significativos en la serie."
  }
];
      
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allCharacters = await Character.find();
    if (allCharacters.length > 0) {
      await Character.collection.drop();
      console.log('Personajes borrados');
    }
  })
  .catch((err) => {
    console.log('error borrando los personajes', err);
  })
  .then(async () => {
    const characterMap = charcatersData.map((character) => new Character(character));
    await Character.insertMany(characterMap);
    console.log('personajes insertados');
  })
  .catch((err) => {
    console.log('error insertando los personajes', err);
  })
  .finally(() => mongoose.disconnect());
