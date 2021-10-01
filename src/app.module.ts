import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@link-cluster.c3hu3.mongodb.net/link?retryWrites=true&w=majority`,
    ),

    LinkModule,
  ],
})
export class AppModule {}
