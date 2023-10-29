import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const multerConfig = {
    dest: path.resolve(__dirname, '..', '..', 'storage', 'images'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'storage', 'images'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(5, (error, hash) => {
                if (error) callback(error, 'Error including hashed filename');

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                callback(null, fileName);
            });
        }
    }),
    limits: {
        //10mb max size
        fileSize: 10 * 1024,
    },
    fileFilter: (req: any, file: any, callback: any) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
            'image/gif',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Invalid file type"));
        }
    }
}

/*

 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const uploads = multer({ storage: storage }); 

  */

export default multerConfig;