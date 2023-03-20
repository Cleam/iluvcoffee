import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: '拿铁',
      brand: 'Starbucks',
      flavors: ['chocolate', 'milk', 'vanilla'],
    },
    {
      id: 3,
      name: '美式',
      brand: 'Starbucks',
      flavors: ['vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((co) => co.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }
    return coffee;
  }

  create(coffee: CreateCoffeeDto) {
    return this.coffees.push(coffee);
  }

  update(id: string, coffee: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    const coffeeIndex = this.coffees.findIndex(
      (co) => co.id === existingCoffee.id,
    );
    const newCoffee = {
      id: +existingCoffee.id,
      name: coffee.name,
      brand: coffee.brand,
      flavors: coffee.flavors,
    };
    this.coffees.splice(coffeeIndex, 1);
    return this.coffees.push(newCoffee);
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((co) => co.id === +id);
    if (coffeeIndex >= 0) {
      return this.coffees.splice(coffeeIndex, 1);
    }
  }
}
