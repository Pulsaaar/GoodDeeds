import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { Prisma } from '@prisma/client';

@Controller('deeds')
export class DeedsController {
  constructor(private readonly deedsService: DeedsService) {}

  @Post()
  create(@Body() data: Prisma.DeedCreateInput) {
    return this.deedsService.createDeed(data);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.deedsService.getDeedsByUserId(Number(userId));
  }

  @Delete(':deedId')
  removeDeed(@Param('deedId') deedId: string) {
    return this.deedsService.removeDeed(Number(deedId));
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() data: { title?: string; description?: string; }
  ) {
    return this.deedsService.updateDeed(Number(id), data);
  }
}
