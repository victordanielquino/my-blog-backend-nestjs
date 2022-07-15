import { MigrationInterface, QueryRunner } from "typeorm";

export class change1657915939244 implements MigrationInterface {
    name = 'change1657915939244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "state" character varying(5) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rolId" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rols" ("id" SERIAL NOT NULL, "initial" character varying(7) NOT NULL, "description" character varying(50) NOT NULL, "state" character varying(5) NOT NULL DEFAULT 'AC', "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b09ba5ba10b47d477a741fa496f" UNIQUE ("initial"), CONSTRAINT "PK_9649ddf4cf7d95770c46bceb191" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ef236db52f60fbe1dc6b83efa8c" FOREIGN KEY ("rolId") REFERENCES "rols"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ef236db52f60fbe1dc6b83efa8c"`);
        await queryRunner.query(`DROP TABLE "rols"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
