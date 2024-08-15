import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeedsService {
  constructor(private prisma: PrismaService) {}
  async createDeed(data: Prisma.DeedCreateInput) {
    //return this.prisma.deed.create({ data });
    return this.prisma.deed.create({ data });
  }

  async getDeedsByUserId(authorId: number) {
    return this.prisma.deed.findMany({
      where: { authorId: authorId },
    });
  }

  async removeDeed(id: number) {
    return this.prisma.deed.delete({
      where: { id: id },
    });
  }

  async updateDeed(id: number, data: Prisma.DeedUpdateInput) {
    return this.prisma.deed.update({
      where: { id },
      data,
    });
  }
}
