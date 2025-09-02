import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './common/config/typeorm.config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV_FILE || '.env',
      isGlobal: true,
      validate
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return getTypeormConfig().options;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      }
    }),
    MovieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
