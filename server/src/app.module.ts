import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    FoodsModule,
    MongooseModule.forRoot('mongodb://localhost/restaurant_management'),
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
