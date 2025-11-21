import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { ItemsService } from '@services/items.service';
import { GetItemsDto } from '@services/dto/items.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortDir', required: false, type: String })
  @ApiOkResponse({ description: 'Paginated list of items' })
  getItems(@Query() query: GetItemsDto) {
    return this.service.findAll(query);
  }
}
