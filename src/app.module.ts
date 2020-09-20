import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.DB_PASSWORD}:admin@cluster0.ifhit.mongodb.net/bnext?retryWrites=true&w=majority`), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
