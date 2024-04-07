import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from 'src/schema';
import { AppModule } from 'src/app.module';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';


@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), MailerModule],
  controllers: [AuthController],
  providers: [AuthService, MailerService]
})
export class AuthModule {}
