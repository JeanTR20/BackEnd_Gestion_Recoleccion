import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Type } from 'class-transformer';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
   
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException('Token invalido o expirado')
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SEED,
      });
      
      const user = await this.authService.obtenerDatosById(payload.id_usuario)

      if(!user.user) throw new UnauthorizedException('El usuario no existe');

      if(!user.user.usuario_estado) throw new UnauthorizedException('El usuario no esta activo');
      
      request['user'] = user;

    } catch (error) {
      throw new UnauthorizedException('error, '+ error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
