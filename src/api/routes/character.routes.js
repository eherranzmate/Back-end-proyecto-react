const express = require('express');
const {getCharacters, postCharacters} = require('../controllers/character.controller');
const characterRoutes = express.Router();
const { upload, uploadToCloudinary  } = require('../../middlewares/file.middleware');



characterRoutes.get('/', getCharacters);
//characterRoutes.get('/:id', getOneCiudad);
characterRoutes.post('/', upload.single('picture'), uploadToCloudinary, postCharacters);

module.exports  = characterRoutes;