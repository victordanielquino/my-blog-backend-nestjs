import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '12345',
  database: 'my_blog',
  // url:process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/core/database/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
})