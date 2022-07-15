import { MigrationInterface, QueryRunner } from "typeorm";

export class change1657854878046 implements MigrationInterface {
    name = 'change1657854878046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "email" TO "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "email"`);
    }

}
