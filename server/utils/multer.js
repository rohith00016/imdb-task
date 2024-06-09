const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "imdb",
    resource_type: "auto",
    public_id: (req, file) => file.originalname,
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "video/mp4",
    "video/avi",
    "video/mkv",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images, audio, and video files are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
