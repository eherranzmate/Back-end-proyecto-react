const Character = require('../models/character.model')


const getCharacters = async (req, res) => {
    try {
        const allCharcaters = await Character.find();
        return res.status(200).json(allCharcaters);
    } catch (error) {
        return res.status(500).json(error)
    }
}


// const getOneCiudad = async (req, res) => {
//     try {
//         const {id} =req.params;
//         const oneCiudad = await Ciudad.findById(id).populate('ciudadanos');
//         return res.status(200).json(oneCiudad);
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }


const postCharacters = async (req, res) => {
    try {
        const movieCharacter= req.file ? req.file_url : null;
        const newCharacter = new Character({
            name: req.body.name,
            actor: req.body.actor,
            description: req.body.description,
            picture: movieCharacter
        });
        console.log("Creando un nuevo personaje:", newCharacter);
        if (!req.body.name || !req.body.actor || !req.body.description) {
            return res.status(400).json({ error: "Los campos name, actor y description son obligatorios." });
        }
        
        const createdCharacter = await newCharacter.save();
        console.log("Personaje creado con éxito:", createdCharacter);
        return res.status(201).json(createdCharacter);
        
    } catch (error) {
        console.error("Error al crear el personaje:", error)
        return res.status(500).json(error)
    }
}



module.exports = {getCharacters, postCharacters};