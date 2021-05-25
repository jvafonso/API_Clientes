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

    async delete(cliente_id: string){
        const produtoNotExists = await this.produtosRepository.findOne({
            cliente_id,
        });

        if(produtoNotExists == null){
            throw new Error("Produto não cadastrado")
        }

        const excluir = await this.produtosRepository.delete({
            cliente_id,
        });

        return excluir;
    }

    async deleteOne(cliente_id: string, id: string){
        const produtoNotExists = await this.produtosRepository.findOne({
            cliente_id,
            id,
        });

        if(produtoNotExists == null){
            throw new Error("Produto não cadastrado")
        }

        const excluir = await this.produtosRepository.delete({
            id,
        });

        return excluir;
    }

    async listAllProducts(cliente_id: string){
        const list = await this.produtosRepository.find({
            where: {cliente_id}
        });

        return list;
    }

    async listOneProduct(cliente_id: string, id: string){
        const list = await this.produtosRepository.find({
            where: {cliente_id, id}
        });

        return list;
    }

    async updateProd(cliente_id: string, id: string, price: number){
        const productDontExists = await this.produtosRepository.findOne({
            cliente_id,
            id,
        });

        if(productDontExists == null){
            throw new Error("Produto não existe")
        }

        await this.produtosRepository.createQueryBuilder().
        update(Produto)
        .set({  price })
        .where( "cliente_id = :cliente_id", {
            cliente_id,
        }).andWhere("id = :id", {
            id,
        }).execute();
    }

    async updateT1(produto: any) {

        await this.produtosRepository.createQueryBuilder().
        update(Produto)
        .set({ cliente_id: produto.cliente_id, prodtname: produto.prodtname, price: produto.price, valid_thru: produto.valid_thru, ProdutoIMG: produto.ProdutoIMG})
        .where( "cliente_id = :cliente_id", {
            cliente_id: produto.cliente_id,
        }).andWhere("id = :id", {
            id: produto.id,
        }).execute();
    }

    
}

export { ProdutosService};