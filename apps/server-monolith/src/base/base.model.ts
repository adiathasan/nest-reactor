import { Schema, SchemaOptions } from '@nestjs/mongoose';

export const BaseSchema = (schemaOptions?: SchemaOptions) => {
  return Schema({
    ...schemaOptions,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    timestamps: true,
  });
};
