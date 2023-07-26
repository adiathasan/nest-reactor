import { Body, Param, Post, Put } from '@nestjs/common';

import { User } from '@server/user/model/user.model';
import { UserService } from './user.service';
import { BaseController } from '@server/base/base.controller';
import { RouteControllerV1 } from '@server/base/decorators/controller.decorator';
import { CreateUserDto, UpdateUserDto } from '@/core';
import { ParseObjectIdPipe } from '@server/base/pipe/ParseObjectIdPipe';

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

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }
}
