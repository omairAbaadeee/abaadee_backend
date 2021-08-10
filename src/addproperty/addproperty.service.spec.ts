import { Test, TestingModule } from '@nestjs/testing';
import { AddpropertyService } from './addproperty.service';

describe('AddpropertyService', () => {
  let service: AddpropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddpropertyService],
    }).compile();

    service = module.get<AddpropertyService>(AddpropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
