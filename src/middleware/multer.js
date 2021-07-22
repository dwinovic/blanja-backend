const multer = require('multer');
const path = require('path');
const short = require('short-uuid');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function(req, file, cb) {
    const uid = short();
    const newUid = uid.generate();
    cb(null, `${newUid}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

// Multiple file upload
const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
}).array('image', 8);

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  // console.log(extName);
  const mimeType = fileTypes.test(file.mimetype);
  // console.log(mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only !!!');
  }
};

module.exports = { upload, uploadMultiple };