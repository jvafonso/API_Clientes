import { getCustomRepository, Repository} from "typeorm";
import { Cliente } from "../entities/Cliente";
import { ClientesRepository} from "../repositories/ClientesRepository";


interface IClientesCreate {
    username: string;
    cpf: string;
    cidade: string;
    endereco: string;
}

class ClientesService {
    private clientesRepository: Repository<Cliente>

    constructor() {
        this.clientesRepository = getCustomRepository(ClientesRepository);
    }

    async create({ username, cpf, cidade, endereco} : IClientesCreate) {

        //Select * from settings where username = "username" limit 1;
        const userAlreadyExists = await this.clientesRepository.findOne({
            username
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }
    
        const clientes = await this.clientesRepository.create({
            username,
            cpf,
            cidade,
            endereco,
        });
    
        await this.clientesRepository.save(clientes);

        return clientes;
    }

    async listbyUser(id: string){
        const list = await this.clientesRepository.find({
            where: {id}
        });

        return list;
    }

    async listAllUsers(){
        const list = await this.clientesRepository.find();

        return list;
    }

}

export {ClientesService}