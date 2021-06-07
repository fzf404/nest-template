import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';

require('dotenv').config()

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    RedisModule.register({
      url: process.env.REDIS_URL,
      name:'redis_demo'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
