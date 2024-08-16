import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Prisma.UserCreateInput) {
    const salt = 10;
    data.password = await bcrypt.hash(data.password, salt);
    return this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserByTag(tag: string) {
    return (await this.prisma.user.findUnique({ where: { tag } })).id;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
