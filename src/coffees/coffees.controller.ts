import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  getAll() {
    return 'All coffees.';
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return `Coffee id #${id}`;
  }

  @Post()
  update(@Body() body) {
    return body;
  }
}
