import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { SignupUserDto } from 'src/dto/user/userDto.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(user: SignupUserDto) {
    const requestId = uuidv4();
    const body = { ...user, requestId };
    await this.userRepository.save(body);
  }

  async getAllUsers() {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.name', 'user.id'])
      .getMany();
    return data;
  }
}
