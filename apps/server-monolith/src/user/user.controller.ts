import { Body, Get, Post } from '@nestjs/common';

import { User } from '@server/user/model/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from '@/core';
import { RouteControllerV1 } from '@server/base/decorators/controller.decorator';
import { BaseController } from '@server/base/base.controller';

@RouteControllerV1({
  path: 'user',
})
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
