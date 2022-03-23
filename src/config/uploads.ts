import { registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as shortid from 'shortid';
import * as mime from 'mime-types';

export default registerAs(
  'upload',
  (): MulterOptions => ({
    storage: diskStorage({
      destination: './static/images/',
      filename: (_, file, callback) => {
        const id = shortid.generate();
        const ext = mime.extension(file.mimetype);
        callback(null, `${id}.${ext}`);
      },
    }),
  }),
);
