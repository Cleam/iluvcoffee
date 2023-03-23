import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1679555765338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" RENAME COLUMN "title" TO "name"`,
    );
  }
}
