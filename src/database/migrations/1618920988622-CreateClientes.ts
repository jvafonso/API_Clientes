import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1618920988622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clientes",
                columns: [
                    {
                       name: "id",
                       type: "uuid",
                       isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                    },
                    {
                        name: "cidade",
                        type: "varchar",
                    },
                    {
                        name: "endereco",
                        type: "varchar",
                    },
                    
                    {
                        name: "Selfie",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "DocumentoID",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "DocumentoED",
                        type: "varchar",
                        isNullable: true
                    }
                    
                    
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
