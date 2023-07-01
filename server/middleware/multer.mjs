import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../public/images');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  },
});

const upload = multer({ storage });

export default upload;
