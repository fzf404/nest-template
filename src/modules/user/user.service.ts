import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/response.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {

  private response: IResponse

  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>
  ) { }

  /**
   * @description: 用户注册
   * @param {User} user
   * @return {*}
   */
  public async regist(user: User) {
    return await this.findOneByName(user.username).then(res => {
      if (res.length != 0) {
        throw this.response = {
          code: 403,
          msg: "用户已注册",
          data: { username: user.username }
        }
      }
    })
      .then(async () => {
        try {
          const createUser = new this.userModel(user)
          await createUser.save()
          return this.response = {
            code: 200,
            msg: "注册成功"
          }
        } catch (err) {
          throw this.response = {
            code: 500,
            msg: "用户保存失败",
            data: err
          }
        }
      })
      .catch(err => err)
  }

  private async findOneByName(username: string) {
    return this.userModel.find({
      username: username
    })
  }
}
