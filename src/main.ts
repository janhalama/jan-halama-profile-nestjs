import { ConfigService } from '@nestjs/config/dist/config.service';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { HttpServerConfig } from 'config/httpServerConfig';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const configService: ConfigService = app.get(ConfigService);
  const httpServerConfig = configService.get<HttpServerConfig>('httpServerConfig');

  await app.listen(httpServerConfig.port);
}
bootstrap();
