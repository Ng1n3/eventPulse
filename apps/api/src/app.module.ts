import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserSchema } from './schema';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { EventsController } from './events/events.controller';
import { EventSchema } from './schema/event.schema';
import { EventService } from './events/events.service';
import { EventModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Event', schema: EventSchema },
    ]),
    AuthModule,
    MailerModule,
    EventModule,
  ],
  controllers: [AuthController, EventsController],
  providers: [AuthService, EventService, MailerService],
})
export class AppModule {}
