import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto, SignUserDto } from 'src/dto';
import { User } from 'src/schema';
import * as argon from 'argon2';
import { dot } from 'node:test/reporters';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto): Promise<User> {
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

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SignUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({email: dto.email})
      if(!user) throw new NotFoundException('credentials incorrect')
    
      const passwordMatch = await argon.verify(user.hash, dto.hash)
      if(!passwordMatch) throw new NotFoundException('credentials incorrect')

      return user;
    } catch (error) {
      throw error
    }
  }
}
