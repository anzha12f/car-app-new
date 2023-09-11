import { IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export class SearchWABDto {
    @IsOptional()
    make: string;
    @IsOptional()
    model: string;
    @IsOptional()
    price: string;
    @IsNotEmpty()
    startDate: string;
    @IsNotEmpty()
    endDate: string;
}