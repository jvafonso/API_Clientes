import { 
    Entity, 
    PrimaryColumn, 
    CreateDateColumn, 
    Column, 
    ManyToOne, 
    JoinColumn 
} from "typeorm"

import {v4 as uuid} from "uuid";

import {Cliente} from "./Cliente"

@Entity("produtos")
class Produto {

    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: "cliente_id"})
    @ManyToOne(() => Cliente)
    cliente: Cliente;

    @Column()
    cliente_id: string;

    @Column()
    prodtname: string;

    @Column()
    price: number;

    @CreateDateColumn()
    valid_thru: Date;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
    
}

export { Produto }