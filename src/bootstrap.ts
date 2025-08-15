import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";
import { GetEnvironmentVariables } from "./common/config/env.validations";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { runDbMigrations } from "./common/config/migrations.config";

export async function bootstrap() {
  const APP_VARIABLES = GetEnvironmentVariables();
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
  //Migrations
  await runDbMigrations();
  //
  await app.listen(APP_VARIABLES.APP_PORT);
}