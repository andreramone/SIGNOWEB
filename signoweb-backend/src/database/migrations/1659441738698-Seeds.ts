import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {pollSeed}from '../poll.seed'
import {optionsSeed}from '../option.seed'
export class Seeds1659441738698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await getRepository("poll").save(
            pollSeed
          );

         await getRepository("option").save(
            optionsSeed
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
