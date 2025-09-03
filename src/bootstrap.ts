import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";
import { GetEnvironmentVariables } from "./common/config/env.validations";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { runDbMigrations } from "./common/config/migrations.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const APP_VARIABLES = GetEnvironmentVariables();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  //docs
  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('Doc for movies-api-ms use')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //Migrations
  await runDbMigrations();
  //
  await app.listen(APP_VARIABLES.APP_PORT);
}