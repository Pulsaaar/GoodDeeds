import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DeedsModule } from './deeds/deeds.module';

@Module({
  imports: [UserModule, DeedsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
