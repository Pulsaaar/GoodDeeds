import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.createUser(createUserDto);
  }

  @Get('verify/:email')
  async findUser(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }


  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('q')
  async checkPasswd() {
    return this.userService.checkPasswd();
  }
}
