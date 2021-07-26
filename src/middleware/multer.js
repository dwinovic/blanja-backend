const multer = require('multer');
const path = require('path');
const short = require('short-uuid');
const maxSize = 1024 * 1024 * 1;

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
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fieldSize: maxSize },
});

// Error Handling Upload File
const uploadFile = (req, res, next, field, maxCount) => {
  const singleUpload = upload.single(field);
  const multipleUpload = upload.array(field, maxCount);
  if (!maxCount) {
    singleUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.log('instanceof', err);
      } else if (err) {
        const message = new Error(err);
        message.status = 405;
        next(message);
      }
      next();
    });
  } else {
    multipleUpload(req, res, (err) => {
      // console.log('req multipleUpload', req.files);
      if (err instanceof multer.MulterError) {
        console.log('instanceof', err);
      } else if (err) {
        // console.log('err', err);
        const message = new Error(err);
        message.status = 405;
        next(message);
      }
      next();
    });
  }
};

// Multiple file upload
// const uploadMultiple = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: function(req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only !!!');
  }
};

module.exports = { uploadFile };