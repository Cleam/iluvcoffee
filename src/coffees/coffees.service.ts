import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Connection } from 'mongoose';
import { Event } from '../events/entities/event.entity';

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
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    // console.log({ paginationQueryDto });
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
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

  // 事务
  async recommendCoffee(coffee: Coffee) {
    // 开启会话
    const session = await this.connection.startSession();

    // 开启事务
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        type: 'coffee',
        name: 'recommend_coffee',
        payload: { coffeeId: coffee.id },
      });
      await recommendEvent.save({ session });
      await coffee.save({ session });
      // 提交事务
      await session.commitTransaction();
    } catch (error) {
      // 回滚（拒绝）事务
      await session.abortTransaction();
    } finally {
      // 结束会话
      session.endSession();
    }
  }
}
