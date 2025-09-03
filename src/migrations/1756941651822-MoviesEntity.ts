import { MigrationInterface, QueryRunner } from "typeorm";

export class MoviesEntity1756941651822 implements MigrationInterface {
    name = 'MoviesEntity1756941651822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "synopsis" character varying NOT NULL, "status" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "director" character varying NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
