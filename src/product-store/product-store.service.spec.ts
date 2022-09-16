import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';
import { Repository } from 'typeorm';
import { ProductStoreService } from './product-store.service';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ProductStoreService', () => {
  let service: ProductStoreService;
  let productRepository: Repository<ProductEntity>;
  let storeRepository: Repository<StoreEntity>;
  let product: ProductEntity;
  let storesList: StoreEntity[];


  const seedDatabase = async () => {
    productRepository.clear();
    storeRepository.clear();

    storesList = [];
    for (let i = 0; i < 5; i++) {
      const store: StoreEntity = await storeRepository.save({
        name: faker.company.name(),
        city: faker.address.cityName(),
        address: faker.address.streetAddress()
      })
      storesList.push(store);
    }

    product = await productRepository.save({
      name: faker.company.name(),
      price: faker.finance.amount(),
      type: faker.lorem.word(),
      stores: storesList
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductStoreService],
    }).compile();

    service = module.get<ProductStoreService>(ProductStoreService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    storeRepository = module.get<Repository<StoreEntity>>(getRepositoryToken(StoreEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
