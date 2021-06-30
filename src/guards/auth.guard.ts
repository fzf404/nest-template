import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // 获得反射troles内容
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return true;
    // 获得反射troles内容
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles[0] == 'admin') {
      return true;
    }
    return false;
  }
}
