import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user/user.entity';
import { LoginUserDto, SignupUserDto } from 'src/dto/user/userDto.dto';
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

  async loginUser(body: LoginUserDto) {
    const { email, password } = body;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.email'])
      .where('user.email=:email', { email: email })
      .andWhere('user.password=:password', { password: password })
      .getOne();

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User Not Found !!');
    }
  }

  async getAllUsers(email: string) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.name', 'user.id'])
      .where('user.email != :email', { email: email })
      .getMany();
    return data;
  }

  async getAllUsersList() {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .getMany();
    return data;
  }
}
