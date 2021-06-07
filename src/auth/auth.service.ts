import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/response.interface';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/modules/user/user.service'
import { encript, makeSalt } from 'src/utils/encripyion';

@Injectable()
export class AuthService {

  private response: IResponse

  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  /**
   * @description: 用户登录
   * @param {User} user
   * @return {*}
   */
  public async login(user: User) {
    const username = user.username
    const password = user.password
    return await this.validateUser(user)
      .then(res => {
        if (res.length == 0) {
          throw this.response = {
            code: 403,
            msg: '用户名或密码错误',
            data: { username: username }
          }
        }
        return res[0]
      })
      .then(async (dbUser: User) => {
        const pass = encript(password, dbUser.salt);
        if (pass == dbUser.password) {
          return this.response = {
            code: 200,
            msg: '登陆成功',
            data: { token: await this.createToken(user) }
          }
        } else {
          throw this.response = {
            code: 403,
            msg: '用户名或密码错误',
            data: { username: username }
          }
        }
      })
      .catch(err => err)
  }

  public async alter(user: User, jwtUserName: string) {
    return this.userService.findOneByName(user.username)
      .then(async (res) => {
        if (res.length == 0 || res[0].username != jwtUserName) {
          return this.response = {
            code: 403,
            msg: '权限不足',
            data: { username: jwtUserName }
          }
        }
        return await this.userModel.findOneAndUpdate({ username: jwtUserName }, user, {}, () => { })
          .then(() => {
            return this.response = {
              code: 200,
              msg: '密码更新成功',
              data: { username: jwtUserName }
            }
          })
      })
  }

  /**
   * @description: 登陆验证
   * @param {User} user
   * @return {*}
   */
  public async isLogin(user: User) {
    return this.response = {
      code: 200,
      msg: "已登录",
      data: user
    }
  }

  /**
   * @description: 用户验证
   * @param {User} user
   * @return {*}
   */
  private async validateUser(user: User) {
    const username: string = user.username
    const password: string = user.password
    return await this.userService.findOneByName(username)
  }

  private async createToken(user: User) {
    return await this.jwtService.sign(user)
  }

}
