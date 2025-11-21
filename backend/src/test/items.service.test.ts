import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '@services/items.service';
import { Repository } from 'typeorm';
import { Item } from '@entities/item.entity';
import { RedisService } from '@services/redis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetItemsDto } from '@services/dto/items.dto';

describe('ItemsService', () => {
  let service: ItemsService;
  let repo: Repository<Item>;
  let redisService: RedisService;
  let redisMock: any;

  beforeEach(async () => {
    redisMock = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            getClient: jest.fn(() => redisMock),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repo = module.get<Repository<Item>>(getRepositoryToken(Item));
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cached response if exists', async () => {
    const cachedData = { items: [], total: 0 };
    redisMock.get.mockResolvedValue(JSON.stringify(cachedData));

    const dto: GetItemsDto = { limit: 10, page: 1 };
    const result = await service.findAll(dto);

    expect(redisMock.get).toHaveBeenCalled();
    expect(result.cached).toBe(true);
    expect(result.items).toEqual([]);
    expect(redisMock.set).not.toHaveBeenCalled();
  });

  it('should fetch from DB if cache is empty', async () => {
    redisMock.get.mockResolvedValue(null);
    const dbData = [[{ id: 1, name: 'Item 1', created_at: new Date() }], 1];
    (repo.findAndCount as jest.Mock).mockResolvedValue(dbData);

    const dto: GetItemsDto = { limit: 10, page: 1 };
    const result = await service.findAll(dto);

    expect(repo.findAndCount).toHaveBeenCalledWith({
      order: { id: 'ASC' },
      take: 10,
      skip: 0,
    });
    expect(result.items.length).toBe(1);
    expect(result.cached).toBe(false);
    expect(redisMock.set).toHaveBeenCalled();
  });

  it('should handle custom sortBy and sortDir', async () => {
    redisMock.get.mockResolvedValue(null);
    const dbData = [[], 0];
    (repo.findAndCount as jest.Mock).mockResolvedValue(dbData);

    const dto: GetItemsDto = {
      limit: 5,
      page: 2,
      sortBy: 'name',
      sortDir: 'DESC',
    };
    const result = await service.findAll(dto);

    expect(repo.findAndCount).toHaveBeenCalledWith({
      order: { name: 'DESC' },
      take: 5,
      skip: 5,
    });
    expect(result.page).toBe(2);
    expect(result.limit).toBe(5);
  });

  it('should fetch from DB if redis client is null', async () => {
    jest
      .spyOn(redisService, 'getClient')
      .mockReturnValue({ get: jest.fn(), set: jest.fn() } as unknown as any);

    const dbData = [[{ id: 1, name: 'Item 1', created_at: new Date() }], 1];
    (repo.findAndCount as jest.Mock).mockResolvedValue(dbData);

    const dto: GetItemsDto = {};
    const result = await service.findAll(dto);

    expect(result.items.length).toBe(1);
    expect(result.cached).toBe(false);
  });

  it('should correctly calculate pages', async () => {
    redisMock.get.mockResolvedValue(null);
    const totalItems = 45;
    const dbData = [
      Array(totalItems).fill({ id: 1, name: 'Item', created_at: new Date() }),
      totalItems,
    ];
    (repo.findAndCount as jest.Mock).mockResolvedValue(dbData);

    const dto: GetItemsDto = { limit: 20, page: 2 };
    const result = await service.findAll(dto);

    expect(result.pages).toBe(Math.ceil(totalItems / dto.limit!));
    expect(result.page).toBe(2);
    expect(result.limit).toBe(20);
  });
});
