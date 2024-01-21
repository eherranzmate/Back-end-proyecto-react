const House = require('../models/house.model');


const getHouses = async(req, res) => {
    try {
        const allHouses = await House.find();
        return res.status(200).json(allHouses);
    } catch (error) {
        return res.status(500).json(error) 
    }
}

// const getOneHouse = async(req, res) => {
//     try {
//         const {id} = req.params;

//         const getOneHouse = await House.findById(id).populate('ciudad');
//         return res.status(200).json(oneHouse);
//     } catch (error) {
//         return res.status(500).json(error) 
//     }
// }

// const getSimpsonsBySurname = async(req, res) => {
//     try {
//         const {surname} = req.params;

//         const oneSimpson = await Simpson.find({apellido: surname});
//         return res.status(200).json(oneSimpson);
//     } catch (error) {
//         return res.status(500).json(error) 
//     }
// }

const postHouses = async(req, res) => {
    try {
        const moviePicture = req.file ? req.file_url : null;
        const newHouse = new House({
            name: req.body.name,
            description: req.body.description,
            foundation: req.body.foundation,
            picture: moviePicture
        });
        const createdHouse = await newHouse.save();
        return res.status(201).json(createdHouse);
    } catch (error) {s
        return res.status(500).json(error)
    }
}

const putHouses = async (req, res) => {
    try {
        const {id} = req.params;
        const putHouses = new House(req.body);
        putHouses._id = id;
        const updateHouses = await House.findByIdAndUpdate(id, putHouses, {new: true});
        if(!updateHouses){
            return res.status(404).json({message: "Houses not found"});
        }
        return res.status(200).json(updateHouses);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteHouses = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteHouses = await House.findByIdAndDelete(id);
        if(!deleteHouses){
            return res.status(404).json({message: "houses not found"});
        }
        return res.status(200).json(deleteHouses);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {getHouses, postHouses, putHouses, deleteHouses}