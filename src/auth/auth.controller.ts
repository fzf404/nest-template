import { Body, Controller, Get, Param, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interfaces/user.interface';
import { Roles } from 'src/modules/roles/roles.decorator';
// import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';

@Controller('')
@ApiTags('验证')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  // 设置Roles
  @ApiOperation({
    summary: '登录'
  })
  async userLogin(@Body() userDto: User) {
    return await this.authService.login(userDto)
  }

  @Get('islogin')
  @Roles('admin')               // 设置Roles
  // @UseGuards(AuthGuard)      // 旧首位
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')         // swagger使用jwt
  @ApiOperation({
    summary: '登录验证'
  })
  async userValidate(@Req() req) {
    return await this.authService.isLogin(req.user)
  }

  @Post('alter')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: '密码修改'
  })
  async userAlter(@Body() userDto: User, @Req() req) {
    return await this.authService.alter(userDto, req.user.username)
  }
}
