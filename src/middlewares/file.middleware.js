const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhqr2awes', 
    api_key: '882462532971982', 
    api_secret: 'up28DuHgp9k6Nnior_lNW6YBiT4' 
  });

const VALID_FILES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../api/uploads'))
    }
  });
  
  const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if(!VALID_FILES.includes(file.mimetype)){
      cb(new Error('Invalid file'))
    } else {
      cb(null, true)
    }
  };

const upload = multer ({
    storage, 
    fileFilter
});

const uploadToCloudinary = async (req, res, next) => {
	if (req.file) {
    try{
		const filePath = req.file.path;
        const image = await cloudinary.uploader.upload(filePath);

		// Borramos el archivo local
    await fs.unlinkSync(filePath);
	
		// Añadimos la propiedad file_url a nuestro Request
    req.file_url = image.secure_url;
		return next();
    }catch(error){
      return next(error)
    }
  } else {
    return next();
  }
};

module.exports = { upload: upload, uploadToCloudinary };
