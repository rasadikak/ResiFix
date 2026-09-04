import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true, // no need to import ConfigModule in every other module
    }),

    // Connects to MongoDB using the URI from .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // Feature modules go here as you build them, e.g.:
    // UsersModule,
    // AuthModule,
    // SectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}