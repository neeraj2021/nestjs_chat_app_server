import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupUserDto } from 'src/dto/user/userDto.dto';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUser() {
    return 'Hello User';
  }

  @Post('/signup')
  async registerUser(@Body() user: SignupUserDto) {
    await this.userService.registerUser(user);
    return 'User Added Sucessfully';
  }

  @Get('/users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
