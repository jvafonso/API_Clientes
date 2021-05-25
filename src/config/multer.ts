
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
      fileSize: 4 * 1024 * 1024,//tamanho maximo de 4 mb de uploads
    },
    fileFilter: (request, file, callback) => {
 

        
        if(file.fieldname === "SelfieU"){
            if(
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg"
            ) {
               
                callback(null, true);
            } else {
                callback(new Error("Format not accepted"));
            }
        } else if(file.fieldname === "DocumentoIDU"){
            if(
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg"
            ) {
                
                callback(null, true);
            } else {
                callback(new Error("Format not accepted"));
            }
        } else if(file.fieldname == "DocumentoEDU"){
            if(
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg"
            ) {
                
                callback(null, true);
            } else {
                callback(new Error("Format not accepted"));
            }
        } else if(file.fieldname == "ProdutoIMG"){
            if(
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg"
            ) {
                
                callback(null, true);
            } else {
                callback(new Error("Format not accepted"));
            }
        }else {
            callback(new Error("Arquive not supported"));
        }
        


    }
} as Options