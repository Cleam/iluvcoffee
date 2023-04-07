import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoffeesService {
  // [
  //   {
  //     id: 1,
  //     name: 'Shipwreck Roast',
  //     brand: 'Buddy Brew',
  //     flavors: ['chocolate', 'vanilla'],
  //   },
  //   {
  //     id: 2,
  //     name: '拿铁',
  //     brand: 'Starbucks',
  //     flavors: ['chocolate', 'milk', 'vanilla'],
  //   },
  //   {
  //     id: 3,
  //     name: '美式',
  //     brand: 'Starbucks',
  //     flavors: ['vanilla'],
  //   },
  // ];

  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll() {
    return this.coffeeModel.find().exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateCoffeeDto },
        { new: true }, // 返回更新后的数据，如果不设置，则会返回更新前的数据
      )
      .exec();
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    return this.coffeeModel.findByIdAndDelete(id);
  }
}
