const express = require('express');
const {getHouses, postHouses, putHouses, deleteHouses} = require('../controllers/house.controller');
const { isAuth } = require('../../middlewares/auth');
const { upload, uploadToCloudinary  } = require('../../middlewares/file.middleware');

const router = express.Router();

router.get('/', getHouses);
// router.get('/:id', getOneSimpsons);
// router.get('/apellido/:surname', getSimpsonsBySurname);
router.post('/', [isAuth], upload.single('picture'), uploadToCloudinary, postHouses);
router.put('/:id', putHouses);
router.delete('/:id', deleteHouses);

module.exports = router;