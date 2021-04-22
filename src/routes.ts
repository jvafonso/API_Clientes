import express, {Router} from "express";
import { ClientesController } from "./controllers/ClientesController";


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

routes.get("/clientes/:id", clientesController.showByUser);

routes.get("/clientes", clientesController.showAllUsers);


export { routes };