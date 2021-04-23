import { 
    Entity, 
    Column,  
    PrimaryColumn,
} from "typeorm";

import {v4 as uuid} from "uuid"


@Entity("clientes1")
class Cliente {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    cpf: string;

    @Column()
    cidade: string;

    @Column()
    endereco: string;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Cliente } 