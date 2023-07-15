import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from '@server/user/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from '@/core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
