
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from "sharp";


export const multerMutipleConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${uniqueSuffix}.${fileExtension}`;
      cb(null, filename);
    },
  }),
};

export async function cropImage(file: Express.Multer.File, size: number[]) {
  const image = sharp(file.path);
  const croppedImageBuffer = await image
    .resize(size[0], size[1])
    .toBuffer();
  const outputPath = `./uploads/${file.filename}`;
  await sharp(croppedImageBuffer).toFile(outputPath);
}