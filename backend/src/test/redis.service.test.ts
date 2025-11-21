import { RedisService } from '@services/redis.service';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

// Мокаем ioredis
jest.mock('ioredis');
const RedisMock = Redis as unknown as jest.Mock<Redis, any[]>;

describe('RedisService', () => {
  let service: RedisService;
  let configServiceMock: Partial<ConfigService>;

  beforeEach(() => {
    jest.clearAllMocks();

    configServiceMock = {
      get: jest
        .fn()
        .mockImplementation(
          (propertyPath: string, defaultValue?: any) => defaultValue,
        ),
    } as unknown as ConfigService;
    service = new RedisService(configServiceMock as ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Redis client and call ping', async () => {
    const pingMock = jest.fn().mockResolvedValue('PONG');
    const onMock = jest.fn();

    RedisMock.mockImplementation(
      () =>
        ({
          ping: pingMock,
          on: onMock,
        }) as unknown as Redis,
    );

    await service.onModuleInit();

    expect(RedisMock).toHaveBeenCalledWith({ host: 'redis', port: 6379 });
    expect(pingMock).toHaveBeenCalled();
    expect(onMock).toHaveBeenCalledWith('error', expect.any(Function));
    expect(service.getClient()).toBeDefined();
  });

  it('should retry if ping fails', async () => {
    let attempts = 0;
    const pingMock = jest.fn().mockImplementation(() => {
      attempts++;
      if (attempts < 3) throw new Error('Not ready');
      return 'PONG';
    });
    const onMock = jest.fn();

    RedisMock.mockImplementation(
      () =>
        ({
          ping: pingMock,
          on: onMock,
        }) as unknown as Redis,
    );

    jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
      fn();
      return 0 as any;
    });

    await service.onModuleInit();

    expect(attempts).toBe(3);
    expect(RedisMock).toHaveBeenCalledTimes(3);
    expect(service.getClient()).toBeDefined();
  });

  it('getClient should return client', async () => {
    const pingMock = jest.fn().mockResolvedValue('PONG');
    const onMock = jest.fn();

    RedisMock.mockImplementation(
      () =>
        ({
          ping: pingMock,
          on: onMock,
        }) as unknown as Redis,
    );

    await service.onModuleInit();

    const client = service.getClient();
    expect(client).toBeDefined();
    expect(typeof client.ping).toBe('function');
  });
});
