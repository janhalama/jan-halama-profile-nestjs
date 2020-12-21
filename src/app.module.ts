import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import configuration from 'config/configuration';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration]
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessagesService],
})
export class AppModule { }
