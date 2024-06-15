import { Test, TestingModule } from '@nestjs/testing';
import { AdminResidenteService } from './admin_residente.service';

describe('AdminResidenteService', () => {
  let service: AdminResidenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminResidenteService],
    }).compile();

    service = module.get<AdminResidenteService>(AdminResidenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
