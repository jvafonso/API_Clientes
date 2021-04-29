
import { Options, diskStorage} from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";

export const multerConfig = {
    dest: resolve(__dirname,"..", "..", "uploads"),
    storage: diskStorage({
        destination: (request, file, callback) =>{
            callback(null, resolve(__dirname,"..", "..", "uploads"))
        },
        filename: (request, file, callback) =>{
            randomBytes(16, (error, hash) =>{
                if (error) {
                    callback(error, file.filename);
                }
                const filename = `${hash.toString("hex")}-${file.originalname}`;
                callback(null, filename);
            });

        },
    }),
    limits: {
      fileSize: 4 * 1024 * 1024 //tamanho maximo de 4 mb de uploads
    },
    fileFilter: (request, file, callback) => {
        const formats = [
            "image/jpg",
            "image/png",
        ];

        if (formats.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Format not accepted"))
        }

    }
} as Options