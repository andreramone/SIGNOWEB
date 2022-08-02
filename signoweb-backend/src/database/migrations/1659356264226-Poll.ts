import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Poll1659356264226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "poll",
              columns: [
                {
                  name: "id",
                  type: "integer",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "title",
                  type: "varchar",
                },
                {
                  name: "start",
                  type: "timestamp",
                },
                {
                  name: "end",
                  type: "timestamp",
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
        await queryRunner.dropTable("poll");
    }

}
