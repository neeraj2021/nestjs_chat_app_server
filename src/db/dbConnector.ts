import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Neeraj@123',
  database: 'chat',
  entities: [User],
  synchronize: false,
  logging: true,
});
