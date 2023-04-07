import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  getAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQueryDto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() coffee: CreateCoffeeDto) {
    return this.coffeeService.create(coffee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() coffee: UpdateCoffeeDto) {
    return this.coffeeService.update(id, coffee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
