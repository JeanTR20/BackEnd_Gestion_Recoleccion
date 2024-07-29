import { Controller, Get, Query } from '@nestjs/common';
import { AdminPersonalService } from './admin_personal.service';
import { ListarAdminPersonal } from './dto/listar-admin_personal.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-personal')
@Controller('admin-personal')
export class AdminPersonalController {
  constructor(private readonly adminPersonalService: AdminPersonalService) {}

  @Get()
  @ApiHeader({
    name: 'Api-Key',
    description: 'Contra de API'
  })
  @ApiOperation({
    summary: 'Listar personal(recolector) - admin',
    description: 'Esta Api permite listar y filtrar los datos de usuario personal(recolector), mediante el Query:{"numero_carnet":"number","apellidos_nombres":"string"}, SP: sp_admin_listar_recolector(?,?) '
  })
  listarrecolector(
    @Query() listarAdminPersonal: ListarAdminPersonal
  ){
    return this.adminPersonalService.listarRecolector(listarAdminPersonal)
  }
}
