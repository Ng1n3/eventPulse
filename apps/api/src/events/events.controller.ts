import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
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
  @Patch(':id')
  editEvent(@Body() dto: EditEventDto, @Param('id') id: string) {
    return this.eventService.editEvent(dto, id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  allEvents() {
    return this.eventService.allEvents()
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  event(@Param('id') id: string) {
    return this.eventService.getEvent(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id)
  }
}