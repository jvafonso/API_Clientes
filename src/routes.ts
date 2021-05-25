import express, {Router,  Request, Response} from "express";
import { ClientesController } from "./controllers/ClientesController";
import { ProdutosController } from "./controllers/ProdutosController";
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



const produtosController = new ProdutosController();

routes.post("/produtos", produtosController.create);

routes.delete("/deleteProd/:cliente_id", produtosController.delete);
routes.delete("/deleteOneProd/:cliente_id/:id", produtosController.deleteOne);

routes.get("/produtos/:cliente_id", produtosController.showAllProducts);
routes.get("/produtos/:cliente_id/:id", produtosController.showOneProduct);

routes.patch("/produtos/:cliente_id/:id", produtosController.update)

routes.post("/produtos/:cliente_id/:id/upload", multer(multerConfig).fields([{name: "ProdutoIMG",maxCount:1}]), produtosController.upload);


export { routes };