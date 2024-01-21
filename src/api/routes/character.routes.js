const express = require('express');
const {getCharacters, postCharacters} = require('../controllers/character.controller');
const characterRoutes = express.Router();
const { upload, uploadToCloudinary  } = require('../../middlewares/file.middleware');



characterRoutes.get('/', getCharacters);
characterRoutes.post('/', upload.single('picture'), uploadToCloudinary, postCharacters);

module.exports  = characterRoutes;