import { Model } from 'mongoose';
import { BaseModel } from '@server/base/base.model';
import { NotFoundException } from '@nestjs/common';

export class BaseService<TModel extends BaseModel> {
  constructor(protected readonly model: Model<TModel>) {}

  async findAll() {
    const data = await this.model.find();
    return {
      data,
    };
  }

  async findOne(id: string): Promise<TModel> {
    const data = await this.model.findById(id);

    if (!data) {
      throw new NotFoundException(`Data with id ${id} not found`);
    }

    return data;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.model.deleteOne({ _id: id });
  }
}
