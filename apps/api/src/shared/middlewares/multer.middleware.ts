import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDirectory = path.join(process.cwd() + '/mx-images/');

// Check if the directory exists, if not create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const getFileStorage = () => {
  return multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (_, file, cb) {
      const d = new Date();
      cb(
        null,
        `${d.toISOString().replace(/:/g, '-')}-${file.originalname.replace(
          /\s+/g,
          ''
        )}`
      );
    },
  });
};

export const ImageUpload = multer({
  storage: getFileStorage(),
});
