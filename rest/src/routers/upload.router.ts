import express, { Request, Response } from 'express';
import { MulterError } from 'multer';
import { getBaseUrl } from '../utils/baseurl.utils';
import { uploadFile } from '../utils/upload.utils';
import fs from 'fs';
import path from 'path';
import { deleteUploadedFile } from '../services/upload.service';

const uploadRouter = express.Router();

uploadRouter.post('/', async(req: Request, res: Response) => {
  try {
    const baseUrl = getBaseUrl(req);
    uploadFile(req, res, async(error) => {
      if(error instanceof MulterError) {
        return res.status(400).json({
          message: error.message,
        });
      } else if(error) {
        return res.status(400).json({
          message: (error as Error).message,
        });
      }

      if(!req.file) {
        return res.status(400).json({
          message: 'No file exist'
        });
      }

      const data = {
        url: `${baseUrl}/uploads/${req.file?.filename}`,
        name: req.file.filename
      }

      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

uploadRouter.delete('/:filename', async(req: Request, res: Response) => {
  try { 
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/' + filename);
    await deleteUploadedFile(filePath);
    res.status(200).json({
      message: 'File deleted successfully',
      filename: filename
    })
  } catch (error) {
    res.status(500).json(error);
  }
});

export default uploadRouter;
