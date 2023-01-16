import path from 'path';
import multer from 'multer';
import routes from './routes';

import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';

require('dotenv').config();
// Settings for let access the localhost:3000 front-end app (using cors middleware)
const config: CorsOptions = {
  origin: "*",
  credentials: true
};

const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, '../client/images'),
  filename: (_: any, file: any, cb: any) => {
    cb(null, file.originalname);
  }
});

const server = express();
// server.name = 'delsur-api';

server.set('json spaces', 2);
// Middlewares
server.use(cors(config));
server.use(express.json());
server.use(morgan('dev'));

server.use(multer({
  storage: imageStorage,
  dest: path.join(__dirname, '../client/images'),
  limits: { fileSize: 2097152 },
  fileFilter: (_: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Image must be an image file type (Supported formats are JPEG, JPG, PNG, GIF).");
  }
}).single('image'));

server.use(express.static(path.join(__dirname, '../client')));

// if (process.env.NODE_ENV === "production") {
//   server.use(express.static(path.join(__dirname, "../client")));
// }

server.use('/', routes);

export default server;
