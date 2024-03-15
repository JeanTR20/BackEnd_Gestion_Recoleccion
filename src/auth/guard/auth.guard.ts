import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Type } from 'class-transformer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
   
    const token = this.extractToken(request);

    if(!token){
      throw new UnauthorizedException('Token invalido o expirado')
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SEED,
      });
      request.user = payload;
      console.log(request.user)

    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request) {
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
      const [, token] = request.headers.authorization?.split(" ");
      return token;
    }
    
    return undefined;
  }
  // private extractToken(request: Request) {
  //   const [type, token] = request.headers.authorization?.split(" ") ?? [];
  //   return type === "Bearer" ? token : undefined;
  // }
}
