import { extname} from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import path =require("path");


// Allow only images
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = path.parse(file.originalname).name.replace(/\s/g,"")+uuidv4();
  const fileExtName = extname(file.originalname);

  // const randomName = Array(4)
  //   .fill(null)
  //   .map(() => Math.round(Math.random() * 10).toString(10))
  //   .join('');
  callback(null, `${name}${fileExtName}`);
  
  
};