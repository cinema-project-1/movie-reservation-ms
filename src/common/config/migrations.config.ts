import { DataSource, DataSourceOptions } from 'typeorm';
import { getTypeormConfig } from './typeorm.config';
import { addTransactionalDataSource } from 'typeorm-transactional';

/**
 * will perform migration in a new connection to see output
 */
export async function runDbMigrations(connectionOptions?: DataSourceOptions) {
  console.log('[migrations] Init');
  const performOperation = async (): Promise<void> => {
    try {
      let temporalConnection: DataSource | undefined;
      try {
        console.log('Connecting to db for migrations');
        const options: DataSourceOptions = {
          ...(connectionOptions || getTypeormConfig().options),
          logging: true, // don't show logs in testing due to spam
        };
        temporalConnection = await new DataSource(options).initialize();
        console.log('DB migration started...');
        await temporalConnection.runMigrations({
          transaction: 'all',
        });
        addTransactionalDataSource({
          name: 'migrations',
          dataSource: temporalConnection,
        });
        await temporalConnection.destroy();
        console.log('DB migration successfully completed');
      } catch (err) {
        console.log('DB migration failed', err);
        await temporalConnection?.destroy();
        throw err;
      }
    } catch (err) {
      console.error('[setupMigrations]', err);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return performOperation();
    }
  };
  await performOperation();
}