import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto, SignUserDto, UpdateUserDto } from 'src/dto';
import { User } from 'src/schema';
import * as argon from 'argon2';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private config: ConfigService,
    private emailService: MailerService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto): Promise<Tokens> {
    try {
      const hash = await argon.hash(dto.hash);

      const user = await this.userModel.findOne({ email: dto.email });

      if (user) {
        throw new ConflictException('User already exists');
      }

      const newUser = await this.userModel
        .create({ ...dto, hash })
        .catch((error) => {
          throw error;
        });

      const tokens = await this.getTokens(newUser.id, newUser.email);
      const access_token = tokens.access_token;

      return { access_token };
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SignUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user) throw new NotFoundException('credentials incorrect');

      const passwordMatch = await argon.verify(user.hash, dto.hash);
      if (!passwordMatch) throw new NotFoundException('credentials incorrect');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateUserDto, id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!user) throw new NotFoundException('id invalid');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async allUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      if (!users) throw new NotFoundException('No users in the database');
      return users;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) throw new NotFoundException('No user found in Database');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('No user with this id found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async sendNotification(dto: SignUserDto): Promise<void> {
    try {
      await this.emailService.sendEmail(
        dto.email,
        'Reset Password',
        'This a notification email from 34Z1',
      );
      console.log('Notification email sent successfully');
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordResetCode(email: string): Promise<object> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const resetCode = crypto.randomUUID();
    // console.log(resetCode);

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 1);

    user.passwordResetCode = resetCode;
    user.passwordResetCodeExpiresAt = expirationTime;

    const currentTime = new Date();

    if (user.passwordResetCodeExpiresAt < currentTime)
      throw new BadRequestException(
        'reset token expired, please request a new one',
      );
    await user.save();

    const message = `Your password reset code is: ${resetCode}`;
    await this.emailService.sendEmail(
      user.email,
      'Password reset code',
      message,
    );

    return { message: `Code has been successfully sent to ${email}` };
  }

  async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user || user.passwordResetCode !== code)
      throw new NotFoundException('Invalid reset code');

    user.hash = await argon.hash(newPassword);
    user.passwordResetCode = null;
    await user.save();
  }

  async getTokens(userId: string, email: string) {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };
    const access_token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('ACCESS_TOKEN'),
      expiresIn: '15m',
    });

    return {
      access_token,
    };
  }
}
