import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminResidenteService } from './admin_residente.service';
import { CreateAdminResidenteDto } from './dto/create-admin_residente.dto';
import { UpdateAdminResidenteDto } from './dto/update-admin_residente.dto';

@Controller('admin-residente')
export class AdminResidenteController {
  constructor(private readonly adminResidenteService: AdminResidenteService) {}

  @Post()
  create(@Body() createAdminResidenteDto: CreateAdminResidenteDto) {
    return this.adminResidenteService.create(createAdminResidenteDto);
  }

  @Get()
  findAll() {
    return this.adminResidenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminResidenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminResidenteDto: UpdateAdminResidenteDto) {
    return this.adminResidenteService.update(+id, updateAdminResidenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminResidenteService.remove(+id);
  }
}
