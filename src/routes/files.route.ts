import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import path from 'path';
import multer from "multer";
import multerConfig from "../config/multer";

const filesRoute = Router();

// Configurando uma pasta para armazenar uploads
const uploadDir = path.join('storage', 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
//Download image route
filesRoute.get('/download/:filename', (req: Request, res: Response, next: NextFunction) => {

    const fileName = req.params.filename;
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
        return res.sendStatus(StatusCodes.NOT_FOUND).send({ message: 'Arquivo não encontrado!' })
    }

    res.download(filePath, fileName, (error) => {
        if (error) {
            console.error(error);
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
        }
    });

    //   res.sendStatus(StatusCodes.OK)
});
//Update image route
filesRoute.post('/upload-image', (req: Request, res: Response, next: NextFunction) => {

    multer(multerConfig).single("file")(req, res, (error: any) => {
        if (error) {
            if (error instanceof multer.MulterError) {
                // Multer error occurred (e.g., file size limit exceeded)
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: 'Multer error: ' + error.message });
            } else {
                // Handle other types of errors (e.g., unexpected errors)
                console.error(error);
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Internal server error' });
            }
        } else {
            // Handle file upload success
            return res.status(StatusCodes.OK).json({ message: 'File uploaded successfully' });
        }
    });
});

export default filesRoute