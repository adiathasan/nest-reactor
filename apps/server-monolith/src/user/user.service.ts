import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from '@/core';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { User } from './model/user.model';
import { usersSeed } from '@server/user/seed/userSeed';
import { BaseService } from '@server/base/base.service';

@Injectable()
export class UserService
  extends BaseService<User>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {
    super(userModel);
  }

  onApplicationBootstrap() {
    return this.seed();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = await bcrypt.hash(
      createUserDto.password,
      this.configService.get<number>('bcrypt.rounds') ?? 10,
    );

    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateUserDto);

    if (updateUserDto.password) {
      const rounds = this.configService.get<number>('bcrypt.rounds') ?? 10;
      user.password = await bcrypt.hash(updateUserDto.password, rounds);
    }

    return user.save();
  }

  async seed() {
    if ((await this.findAll())?.data.length > 0) {
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
