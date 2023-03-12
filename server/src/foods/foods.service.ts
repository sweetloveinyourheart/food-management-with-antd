import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food, FoodDocument } from './schemas/food.schema';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<FoodDocument>
  ) { }

  async create(createFoodDto: CreateFoodDto) {
    try {
      const newFood = await this.foodModel.create({
        ...createFoodDto,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })

      return await newFood.save()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    return await this.foodModel.find()
  }

  async findOne(id: string) {
    try {
      return await this.foodModel.findById(id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    try {
      return await this.foodModel.findByIdAndUpdate(id, updateFoodDto)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async remove(id: string) {
    try {
      return await this.foodModel.findByIdAndDelete(id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }
}
