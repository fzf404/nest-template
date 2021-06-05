import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Post('regist')
  @ApiOperation({
    summary: '用户注册'
  })
  async registUser(@Body() userDto: User) {
    return await this.userService.regist(userDto)
  }
}
