import { Module } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeedsController],
  providers: [DeedsService, PrismaService],
})
export class DeedsModule {}
