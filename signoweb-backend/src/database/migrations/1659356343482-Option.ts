import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Option1659356343482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "option",
      
              columns: [
                {
                  name: "id",
                  type: "integer",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "pollId",
                  type: "integer",
                },
                {
                  name: "title",
                  type: "varchar",
                },
                {
                  name: "votes",
                  type: "integer",
                  default: 0,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("option");
    }

}
