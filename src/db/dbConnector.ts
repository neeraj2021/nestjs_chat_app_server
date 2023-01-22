import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

function databaseCred() {
  if (process.env.MODE == 'local') {
    return {
      HOST: 'localhost',
      PORT: 3306,
      USERNAME: 'root',
      PASSWORD: 'Neeraj@123',
      DATABASE: 'chat',
    };
  }
  return {
    HOST: process.env.CHAT_HOST,
    PORT: process.env.CHAT_PORT,
    USERNAME: process.env.CHAT_USER_NAME,
    PASSWORD: process.env.CHAT_PASSWORD,
    DATABASE: process.env.CHAT_DATABASE,
  };
}

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: databaseCred().HOST,
  port: Number(databaseCred().PORT),
  username: databaseCred().USERNAME,
  password: databaseCred().PASSWORD,
  database: databaseCred().DATABASE,
  entities: [User],
  synchronize: false,
  logging: false,
});
