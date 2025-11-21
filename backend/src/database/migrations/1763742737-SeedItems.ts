import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class _1763742737SeedItems implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'text' },
          { name: 'created_at', type: 'timestamp' },
        ],
        indices: [
          {
            name: 'IDX_ITEM_NAME',
            columnNames: ['name'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
  }
}
