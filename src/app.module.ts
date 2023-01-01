import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { typeOrmModule } from './db/dbConnector';

@Module({
  imports: [typeOrmModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
