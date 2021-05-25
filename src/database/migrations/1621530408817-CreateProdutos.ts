import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProdutos1621530408817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                       name: "id",
                       type: "uuid",
                       isPrimary: true
                    },
                    {
                        name: "cliente_id",
                        type: "uuid",
                    },
                    {
                        name: "prodtname",
                        type: "varchar",
                    },
                    {
                        name: "valid_thru",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "price",
                        type: "number",
                    },
                    {
                        name: "ProdutoIMG",
                        type: "varchar",
                        isNullable: true
                    },
                    
                ],
                foreignKeys: [
                    {
                        name: "FKCliente",
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"],
                        columnNames: ["cliente_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos");
    }

}
