import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';
import { AppGateway } from './getway/app.gateway';
import { KucoinModule } from './kucoin/kucoin.module';
import { HttpModule } from '@nestjs/axios';
import { TelegramBotModule } from './telegram_bot/telegram.module';
const MongooseConnection = 'mongodb://localhost:27017/graphql';
@Module({
  imports: [
    MongooseModule.forRoot(MongooseConnection),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
      playground: true,
    }),
    
    CategoryModule,
    AppGateway,
    KucoinModule,
    TelegramBotModule,
  ],
  providers: [],
})
export class AppModule {}
