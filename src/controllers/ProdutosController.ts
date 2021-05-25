import { Request, Response } from "express";
import { ProdutosService } from "../services/ProdutosService";
import fs from "fs";

class ProdutosController {
    async create(request: Request, response: Response) {
        const { cliente_id, prodtname, price} = request.body;
        const produtosService = new ProdutosService();

        const produto = await produtosService.create({
            cliente_id,
            prodtname,
            price
        })

        return response.json(produto);
    }

    async delete(request: Request, response: Response){
        const {cliente_id} = request.params;

        const produtosService = new ProdutosService();

        try{
            const list = await produtosService.delete(cliente_id);

            return response.json(list);
        } catch(err){
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async deleteOne(request: Request, response: Response){
        const {cliente_id, id} = request.params;

        const produtosService = new ProdutosService();

        try{
            const list = await produtosService.deleteOne(cliente_id, id);

            return response.json(list);
        } catch(err){
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async showAllProducts(request: Request, response: Response){
        const {cliente_id} = request.params;

        try{
            const produtosService = new ProdutosService();


            const list = await produtosService.listAllProducts(cliente_id);

            if(list.length > 0){
                return response.json(list);
            }else{
                return response.json({"Error" : "001", "Message" : "Não foi encontrado nenhum produto com o id cliente fornecido."});
            }
        }catch(err){
            return response.json({"Error" : "002", "Message" : err.message});
        }
    }

    async showOneProduct(request: Request, response: Response){
        const {cliente_id, id} = request.params;

        try{
            const produtosService = new ProdutosService();


            const list = await produtosService.listOneProduct(cliente_id, id);

            if(list.length == 1){
                return response.json(list);
            }else{
                return response.json({"Error" : "001", "Message" : "Esse cliente não possui nenhum produto compro com esse id."});
            }
        }catch(err){
            return response.json({"Error" : "002", "Message" : err.message});
        }
    }

    async update(request: Request, response: Response){
        const {cliente_id, id} = request.params;
        const { price } = request.body;

        const produtosService = new ProdutosService();

        try {
            const produtos = await produtosService.updateProd(cliente_id, id, price);

            return response.json(produtos);

        } catch(err){
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async upload(request: Request, response: Response){
        const {cliente_id, id} = request.params;
        const {ProdutoIMG} = request.body;
        const produtosService = new ProdutosService();
        const listaProduto = await produtosService.listOneProduct(cliente_id, id);
        const produto = listaProduto[0];

        const byteToBase64 = bytes => {
            let objJsonStr = JSON.stringify(bytes);
            return Buffer.from(objJsonStr).toString("base64");
        };

        const base64ProdutoIMG = await byteToBase64(await fs.readFileSync(request.files['ProdutoIMG'][0].path));

        produto['ProdutoIMG'] = base64ProdutoIMG;

        await produtosService.updateT1(produto);
        const produtoAlterado = await produtosService.listOneProduct(cliente_id, id);
        return response.json({produtoAlterado});
    }

    
}

export { ProdutosController };