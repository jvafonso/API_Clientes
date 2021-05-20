import { Request, Response } from "express";
import { ProdutosService } from "../services/ProdutosService";

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
}

export { ProdutosController };