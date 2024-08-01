import { IsNumber } from "class-validator"

export class CreateOrderDto {
    @IsNumber()
    price: number
    
    @IsNumber()
    total: number
}
