import { ApiProperty } from "@nestjs/swagger"
import { Category } from "../schemas/food.schema"

class NutritionDTO {
    @ApiProperty()
    calories: number

    @ApiProperty()
    fat: number

    @ApiProperty()
    protein: number

    @ApiProperty()
    carbohydrates: number

    @ApiProperty()
    fiber: number

    @ApiProperty()
    sugar: number

    @ApiProperty()
    sodium: number
}

export class CreateFoodDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty({ enum: Category })
    category: Category

    @ApiProperty({ minimum: 0 })
    price: number

    @ApiProperty({ minimum: 0 })
    weight: number

    @ApiProperty({ required: false })
    country: string

    @ApiProperty()
    image: string

    @ApiProperty()
    ingredients: string[]

    @ApiProperty()
    allergens: string[]

    @ApiProperty()
    nutrition: NutritionDTO
}
