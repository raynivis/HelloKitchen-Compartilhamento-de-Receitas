import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerConfig = (directory = 'files') => {
  return {
    storage: diskStorage({
      destination: './upload/files/' + directory,
      filename: (req, file, cb) => {
        const extension = path.parse(file.originalname).ext;
        cb(null, `${uuidv4()}${extension}`);
      },
    }),
  };
};

export default multerConfig;
