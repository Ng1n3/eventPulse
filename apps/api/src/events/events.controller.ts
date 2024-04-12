import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { EventService } from './events.service';
import { EditEventDto } from 'src/dto';
import {
  GetCurrentUserId,
  Public,
} from 'src/auth/common/decorators';
import { Event } from 'src/schema';

@Controller('v1/events')
export class EventsController {
  constructor(private eventService: EventService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create-event')
  createEvent(@GetCurrentUserId() userId: string, @Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  editEvent(@Body() dto: EditEventDto, @Param('id') id: string) {
    return this.eventService.editEvent(dto, id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('my-events')
  async getMyEvents(@GetCurrentUserId() userId: string) {
    return await this.eventService.getEventsByUserId(userId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async allEvents(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query('filters') filters: string,
  ): Promise<{
    data: Event[];
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    try {
      const parsedFilters = JSON.parse(filters || '{}');
      const { data, total, hasNextPage, hasPreviousPage } =
        await this.eventService.allEvents(
          page,
          limit,
          sortBy,
          sortOrder,
          parsedFilters,
        );

      return { data, total, hasNextPage, hasPreviousPage };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve events');
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('buy-event/:id')
  async buyEvent(@GetCurrentUserId() userId: string, @Param('id') id: string) {
    return await this.eventService.buyEvent(userId, id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  event(@Param('id') id: string) {
    return this.eventService.getEvent(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
