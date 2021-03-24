import { Test, TestingModule } from '@nestjs/testing';
import { AddpropertyController } from './addproperty.controller';

describe('AddpropertyController', () => {
  let controller: AddpropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddpropertyController],
    }).compile();

    controller = module.get<AddpropertyController>(AddpropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
