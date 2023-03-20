const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads");
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    return cb(null, req.body.nume + ".jpg");
  },
});

const upload = multer({ storage });

module.exports = upload;
