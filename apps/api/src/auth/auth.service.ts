import {
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
      const user = await this.userModel.findById(id)
      if(!user) throw new NotFoundException('No user with this id found');
      return user
    } catch (error) {
      throw error
    }
  }

  async sendPasswordResetCode(email: string): Promise<void> {
    const user = await this.userModel.findOne({email})
    if(!user) throw new NotFoundException('User not found')

    const resetCode = crypto.randomUUID()
  }
}