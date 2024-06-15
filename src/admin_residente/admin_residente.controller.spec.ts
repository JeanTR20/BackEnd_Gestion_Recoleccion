import { Test, TestingModule } from '@nestjs/testing';
import { AdminResidenteController } from './admin_residente.controller';
import { AdminResidenteService } from './admin_residente.service';

describe('AdminResidenteController', () => {
  let controller: AdminResidenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminResidenteController],
      providers: [AdminResidenteService],
    }).compile();

    controller = module.get<AdminResidenteController>(AdminResidenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
