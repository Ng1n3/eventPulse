import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/common/guards';
import { JwtModule } from '@nestjs/jwt';
import { GlobalErrorFilter } from './middleware/error.middleware';

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
    JwtModule.register({}),
  ],
  controllers: [AuthController, EventsController],
  providers: [
    AuthService,
    EventService,
    MailerService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalErrorFilter).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}