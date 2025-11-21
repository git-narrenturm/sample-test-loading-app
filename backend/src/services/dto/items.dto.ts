import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetItemsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ default: 20 })
  limit?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  page?: number = 1;

  @ApiPropertyOptional({ default: 'created_at' })
  sortBy?: string = 'created_at';

  @ApiPropertyOptional({ default: 'ASC' })
  sortDir?: 'ASC' | 'DESC' = 'ASC';
}
