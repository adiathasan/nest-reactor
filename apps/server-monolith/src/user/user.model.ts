import { Prop, SchemaFactory } from '@nestjs/mongoose';

import { RoleEnum } from '@/core';
import { BaseSchema } from '@server/base/base.model';

// create a user model with mongoose schema

@BaseSchema()
export class User {
  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string; // email

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    enum: RoleEnum,
    default: RoleEnum.USER,
    required: true,
  })
  role: RoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
