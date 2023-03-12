import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schemas/food.schema';

@Module({
  imports: [MongooseModule.forFeature([{ schema: FoodSchema, name: Food.name }])],
  controllers: [FoodsController],
  providers: [FoodsService]
})
export class FoodsModule {}
