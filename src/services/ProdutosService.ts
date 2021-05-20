import { getCustomRepository, Repository } from "typeorm";
import { Produto } from "../entities/Produto";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

interface IProdutosCreate {
    cliente_id: string;
    prodtname: string;
    price: number;
}

class ProdutosService {
    private produtosRepository: Repository<Produto>;

    constructor() {
        this.produtosRepository = getCustomRepository(ProdutosRepository);
    }

    async create({ cliente_id, prodtname, price}: IProdutosCreate){
        const produto = this.produtosRepository.create({ 
            cliente_id, 
            prodtname, 
            price 
        });

        await this.produtosRepository.save(produto);
        return produto;
    }
}

export { ProdutosService};