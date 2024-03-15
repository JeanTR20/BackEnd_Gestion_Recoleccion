import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as request from 'supertest';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor( private readonly reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredRoles = this.reflector.get<string[]>('roles', 
      context.getHandler()
    );

    if(!requiredRoles){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user
    console.log(usuario)
    return true;
    // return requiredRoles.some((role)=> usuario.rol_nombre?.includes(role))
  }
}
