import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { MailerModule } from 'src/mailer/mailer.module';
import { EventSchema } from 'src/schema/event.schema';

import { MailerService } from 'src/mailer/mailer.service';
import { EventsController } from './events.controller';
import { EventService } from './events.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Event', schema: EventSchema}]), MailerModule],
  controllers: [EventsController],
  providers: [EventService, MailerService]
})
export class EventModule {
}