import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

export enum Category {
    Meat = 'meat', 
    Fish = 'fish', 
    Fruit = 'fruit', 
    Vegetable = 'vegetable', 
    Bakery = 'bakery', 
    Dairy = 'dairy', 
    Snacks = 'snacks', 
    Beverage = 'beverage'
}

@Schema({ _id: false })
export class NutritionSchema {
    @Prop()
    calories: number

    @Prop()
    fat: number

    @Prop()
    protein: number

    @Prop()
    carbohydrates: number

    @Prop()
    fiber: number

    @Prop()
    sugar: number

    @Prop()
    sodium: number
};

@Schema()
export class Food {
    @Prop({ required: true })
    name: string

    @Prop()
    description: string

    @Prop({ enum: Category, required: true })
    category: Category

    @Prop({ required: true, min: 0 })
    price: number

    @Prop({ required: true, min: 0 })
    weight: number

    @Prop()
    country: string

    @Prop()
    ingredients: string[]

    @Prop()
    image: string

    @Prop({ type: NutritionSchema })
    nutrition: NutritionSchema

    @Prop({ default: new Date })
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const FoodSchema = SchemaFactory.createForClass(Food);