import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { typeOrmModule } from './db/dbConnector';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [typeOrmModule, UserModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
