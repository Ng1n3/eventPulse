import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { EventService } from './events.service';
import { EditEventDto } from 'src/dto';


@Controller('v1/events')
export class EventsController {
  constructor(private eventService: EventService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create-event')
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit-event')
  editEvent(@Body() dto: EditEventDto, @Param() id: string) {
    return this.eventService.editEvent(dto, id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  allEvents() {
    return this.eventService.allEvents()
  }

  @HttpCode(HttpS)
}