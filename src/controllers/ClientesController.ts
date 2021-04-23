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
            console.log("list => ",list.length);

            if(list.length > 0){
                return response.json(list);
            }else{
                return response.json({"Error" : "001", "Message" : "Não foi encontrado nenhum cliente com o id fornecido."});
            }
        }catch(e){
            return response.json({"Error" : "002", "Message" : e.message});
        }
       


    }

    async showAllUsers(request: Request, response: Response){
        const { } = request.params;
        
        const clientesService = new ClientesService();

        const list = await clientesService.listAllUsers();

        return response.json(list);
    }

}

export { ClientesController }