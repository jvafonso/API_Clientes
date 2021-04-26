import { Request, Response } from "express";
import { ClientesService } from "../services/ClientesService";

class ClientesController {
    
    async create(request: Request, response: Response) {
        const { username, cpf, cidade, endereco } = request.body;

        const clientesService = new ClientesService();

        try {
            const clientes = await clientesService.create({  username, cpf, cidade, endereco });
       
    
            return response.json(clientes);

        }catch (err) {
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async showByUser(request: Request, response: Response){
        const {id} = request.params;


        try{
            const clientesService = new ClientesService();

        
            const list = await clientesService.listbyUser(id);

            if(list.length > 0){
                return response.json(list);
            }else{
                return response.json({"Error" : "001", "Message" : "Não foi encontrado nenhum cliente com o id fornecido."});
            }
        }catch(err){
            return response.json({"Error" : "002", "Message" : err.message});
        }
       


    }

    async showAllUsers(request: Request, response: Response){
        const { } = request.params;

        try {
            const clientesService = new ClientesService();

            const list = await clientesService.listAllUsers();
    
            if(list.length > 0){
                return response.json(list);
            } else {
                return response.json({"Error" : "003", "Message" : "Não há clientes cadastrados na lista."});
            }
        }catch(err){
            return response.json({"Error" : "004", "Message" : err.message});
        }
        

    }

    async deleteByUser(request: Request, response: Response){
        const {id} = request.params;

        const clientesService = new ClientesService();

        try{
            const list = await clientesService.exclude(id);

            return response.json(list);
        } catch(err){
            return response.status(400).json({
                message: err.message,
            });
        }

    }

    async deleteAllUsers(request: Request, response: Response){
        const { } = request.params;

        const clientesService = new ClientesService();

        const list = await clientesService.excludeAll();

    
        return response.json(list);
        
        
    }

    async update(request: Request, response: Response){
        const {id} = request.params;
        const { username, cpf, cidade, endereco } = request.body;

        const clientesService = new ClientesService();

        try{
            const clientes = await clientesService.update(id,username, cpf, cidade, endereco);

            return response.json(clientes);
        } catch(err) {
            return response.status(400).json({
                message: err.message,
            });
        }

    }

    async updateP(request: Request, response: Response){
        const {id} = request.params;
        const { cidade } = request.body;

        const clientesService = new ClientesService();

        try{
            const clientes = await clientesService.updateP(id, cidade);

            return response.json(clientes);
        } catch(err) {
            return response.status(400).json({
                message: err.message,
            });
        }

       
    }

}

export { ClientesController }