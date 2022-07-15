import { MigrationInterface, QueryRunner } from "typeorm";

export class change1657850582777 implements MigrationInterface {
    name = 'change1657850582777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "email" TO "username"`);
    }

}
