import { Injectable, NestMiddleware } from '@nestjs/common';
import { encript, makeSalt } from 'src/utils/encripyion';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let userPassword = req.body['password']
    if (userPassword) {
      const salt = makeSalt()
      req.body['password'] = encript(userPassword, makeSalt())
      req.body['salt'] = salt
    }
    next();
  }
}
