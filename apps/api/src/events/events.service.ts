import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EditEventDto } from 'src/dto';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { User } from 'src/schema';
import { Event } from 'src/schema/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: mongoose.Model<Event>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private config: ConfigService,
    private emailService: MailerService,
  ) {}

  async createEvent(dto: CreateEventDto, userId: string): Promise<Event> {
    try {
      const event = await this.eventModel.findOne({ title: dto.title });
      if (event)
        throw new ConflictException(
          'This title already exists, please use another title',
        );

      const user = await this.userModel.findById(userId)
      if(!user) throw new NotFoundException('user not found')
      
        
      const newEvent = await this.eventModel
        .create({ ...dto, eventUsersId: userId, createdBy: user.name })
        .catch((error) => {
          throw error;
        });

      return newEvent;
    } catch (error) {
      throw error;
    }
  }

  async editEvent(dto: EditEventDto, id: string): Promise<Event> {
    try {
      const event = await this.eventModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!event) throw new NotFoundException('id invalid');

      return event;
    } catch (error) {
      throw error;
    }
  }

  async allEvents(): Promise<Event[]> {
    try {
      const events = await this.eventModel.find();
      if (!events) throw new NotFoundException('No events in database');
      return events;
    } catch (error) {
      throw error;
    }
  }

  async getEvent(id: string): Promise<Event> {
    try {
      const event = await this.eventModel.findById(id);
      if (!event) throw new NotFoundException('No event with this id exists');
      return event;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      const event = await this.eventModel.findByIdAndDelete(id);
      if (!event)
        throw new NotFoundException('no event with this id exist in database');
    } catch (error) {
      throw error;
    }
  }
}
