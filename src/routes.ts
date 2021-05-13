import express, {Router,  Request, Response} from "express";
import { ClientesController } from "./controllers/ClientesController";
import { multerConfig } from './config/multer';
import  multer from "multer";

const routes = Router();

/**
 * Tipos de parametros
 * Route Params => Parametros de rotas
 * http://localhost:3333/settings/1
 * 
 * Query params => filtros de buscas
 * http://localhost:3333/settings/1?search=algumacoisa
 * 
 * Body params => {
 * 
 * }
 */

const clientesController = new ClientesController();

routes.post("/clientes", clientesController.create);


//routes.post("/clientes", multer(multerConfig).any(), clientesController.create);

routes.post("/clientes/:id/upload", multer(multerConfig).fields([{name: "SelfieU",maxCount:1}, {name: "DocumentoIDU",maxCount:1}, {name: "DocumentoEDU",maxCount:1}]), clientesController.upload);
//routes.post("/clientes/:id/upload", multer(multerConfig).array("listField", 3), clientesController.upload);


routes.get("/clientes/:id", clientesController.showByUser);

routes.get("/clientes", clientesController.showAllUsers);

routes.put("/clientes/:id", clientesController.update);

routes.patch("/clientes/:id", clientesController.updateP);

routes.delete("/clientes/:id", clientesController.deleteByUser);

routes.delete("/clientes", clientesController.deleteAllUsers);


export { routes };