import { CreateUserDto } from '@/core';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';
import { usersSeed } from '@server/user/seed/userSeed';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  onApplicationBootstrap() {
    return this.seed();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = await bcrypt.hash(
      createUserDto.password,
      this.configService.get<number>('bcrypt.rounds') ?? 10,
    );

    return createdUser.save();
  }

  async seed() {
    if ((await this.findAll()).length > 0) {
      return [];
    }

    const rounds = this.configService.get<number>('bcrypt.rounds') ?? 10;

    return this.userModel.bulkSave(
      usersSeed.map((user) => {
        const createdUser = new this.userModel(user);
        createdUser.password = bcrypt.hashSync(user.password, rounds);
        return createdUser;
      }),
    );
  }
}
