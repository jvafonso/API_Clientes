import { Request, Response } from "express";
import { ClientesService } from "../services/ClientesService";
import fs from "fs";

class ClientesController {
    
    async create(request: Request, response: Response) {
        
        const { username, cpf, cidade, endereco, Selfie, DocumentoID, DocumentoED } = request.body;
        //const { Selfie, DocumentoID, DocumentoED} = request.file.path;

        const clientesService = new ClientesService();

        try {
            const clientes = await clientesService.create({  username, cpf, cidade, endereco, Selfie, DocumentoID, DocumentoED});
       
    
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

        try{
            const clientesService = new ClientesService();

            const list = await clientesService.excludeAll();

            if (list.raw.length > 0){
                return response.json(list);

            }else {
                return response.json({"Error" : "005", "Message" : "Nenhum registro apagado. Tabela Vazia."});
            }

        } catch(err){
            return response.json({"Error" : "006", "Message" : err.message});
        }
            
        
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

    async upload(request: Request, response: Response){
        
        const {id} = request.params;
        const { Selfie, DocumentoID, DocumentoED } = request.body;
        const clientesService = new ClientesService();
        const listaCliente = await clientesService.listbyUser(id);
        const cliente = listaCliente[0];

        const byteToBase64 =  async bytes => {
            let objJsonStr = JSON.stringify(bytes);
            return Buffer.from(objJsonStr).toString("base64");
        };
        
        const base64Selfie = await byteToBase64(await fs.readFileSync(request.files['SelfieU'][0].path));
        const base64DocumentoID = await byteToBase64(await fs.readFileSync(request.files['DocumentoIDU'][0].path));
        const base64DocumentoED = await byteToBase64(await fs.readFileSync(request.files['DocumentoEDU'][0].path));

        cliente['Selfie'] = base64Selfie;
        cliente['DocumentoID'] = base64DocumentoID;
        cliente['DocumentoED'] = base64DocumentoED;
        

        
        await clientesService.updateT3(cliente);
        const clientealterado = await clientesService.listbyUser(id);
        return response.json({clientealterado});
        




    }
 
}

export { ClientesController }