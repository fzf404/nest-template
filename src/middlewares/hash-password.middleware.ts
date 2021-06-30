import { Injectable, NestMiddleware } from '@nestjs/common';
import { IResponse } from 'src/interfaces/response.interface';
import { encript, makeSalt } from 'src/utils/encripyion';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  private response: IResponse;

  use(req: any, res: any, next: () => void) {
    const userPassword = req.body['password'];
    if (userPassword.length < 8 || userPassword.length > 18) {
      req.body['password'] = '';
    } else {
      const salt = makeSalt();
      req.body['password'] = encript(userPassword, salt);
      req.body['salt'] = salt;
    }
    next();
  }
}
