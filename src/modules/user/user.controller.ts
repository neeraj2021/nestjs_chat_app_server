import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginUserDto, SignupUserDto } from 'src/dto/user/userDto.dto';
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

  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    return await this.userService.loginUser(body);
  }

  @Get('/users')
  async getAllUsers(@Query('email') email: string) {
    return await this.userService.getAllUsers(email);
  }

  @Get('/all')
  async getAllUsersList() {
    return this.userService.getAllUsersList()
  }
}
