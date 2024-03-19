import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminPersonalService } from './admin_personal.service';
import { CreateAdminPersonalDto } from './dto/create-admin_personal.dto';
import { UpdateAdminPersonalDto } from './dto/update-admin_personal.dto';

@Controller('admin-personal')
export class AdminPersonalController {
  constructor(private readonly adminPersonalService: AdminPersonalService) {}

  // @Post()
  // create(@Body() createAdminPersonalDto: CreateAdminPersonalDto) {
  //   return this.adminPersonalService.create(createAdminPersonalDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminPersonalService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminPersonalService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminPersonalDto: UpdateAdminPersonalDto) {
  //   return this.adminPersonalService.update(+id, updateAdminPersonalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminPersonalService.remove(+id);
  // }
}
