const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

module.exports = upload.single('image')