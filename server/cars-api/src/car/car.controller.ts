import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Vehicles } from './cars/vehicle.interface';
import { SearchDto } from './dto/search-car.dto';
import { SearchWABDto } from './dto/search-wab.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() vehicle: Vehicles) {
    return this.carService.create(vehicle);
  }

  @Get()
  findAll(): Vehicles[] {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Vehicles {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }

  @Post('/search')
  search(@Body() search: SearchDto) {
      return this.carService.search(search);
  }

  @Post('/search/booking')
  searchWithAvailableBooking(@Body() search: SearchWABDto) {
      return this.carService.searchWithAvailableBooking(search);
  }
}
