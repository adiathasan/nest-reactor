import { BaseModel } from '@server/base/base.model';
import { BaseService } from '@server/base/base.service';
import { ParseObjectIdPipe } from '@server/base/pipe/ParseObjectIdPipe';
import { Delete, Get, Param } from '@nestjs/common';

export class BaseController<IModel extends BaseModel> {
  constructor(private readonly baseService: BaseService<IModel>) {}

  @Get('list')
  async findAll(): Promise<IModel[]> {
    return this.baseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<IModel> {
    return this.baseService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.baseService.remove(id);
  }
}
