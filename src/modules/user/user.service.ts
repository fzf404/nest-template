import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisModule, RedisService } from 'nestjs-redis';
import { IResponse } from 'src/interfaces/response.interface';
import { User } from 'src/interfaces/user.interface';
import * as Redis from 'ioredis'

const logger = new Logger("/modules/user/user.service.ts");

@Injectable()
export class UserService {
  private response: IResponse
  private redis: Redis.Redis

  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient('redis_demo')
  }

  /**
   * @description: 用户注册
   * @param {User} user
   * @return {*}
   */
  public async regist(user: User) {
    if (!user.password) {
      return this.response = {
        code: 403,
        msg: "密码需在3-16位之间",
      }
    } else if (user.username.length < 3 || user.username.length > 16) {
      return this.response = {
        code: 403,
        msg: "用户名需在3-16位之间",
        data: { username: user.username }
      }
    }
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
      .catch(err => {
        logger.error(err)
        return err
      })

  }


  public async findOneByName(username: string) {
    return this.userModel.find({
      username: username
    })
  }

  public async redisTest() {
    this.redis.set('hello', 'hello redis!')
    return this.redis.get('hello')
  }
}
