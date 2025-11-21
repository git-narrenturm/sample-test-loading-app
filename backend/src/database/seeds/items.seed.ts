import { DataSource } from 'typeorm';
import { Item } from '@entities/items.entity';

const CLEAR_TABLE_BEFORE_SEED = true;

export async function seedItems(dataSource: DataSource) {
  const repo = dataSource.getRepository(Item);

  if (CLEAR_TABLE_BEFORE_SEED) {
    console.log('Clearing items table...');
    await dataSource.query('TRUNCATE TABLE Item RESTART IDENTITY CASCADE');
  }
  Item;

  const batchSize = 1000;
  const total = 50000;

  for (let i = 0; i < total; i += batchSize) {
    const batch: Partial<Item>[] = [];

    for (let j = i; j < i + batchSize && j < total; j++) {
      batch.push({
        name: `Item ${j + 1}`,
        created_at: new Date(),
      });
    }

    await repo.insert(batch);
    console.log(`Inserted ${i + batch.length}/${total}`);
  }
}
