import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EventDocument } from './event.schema';
// import { UserEvent } from './user-event.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, default: () => new mongoose.Types.ObjectId() })
  _id: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  hash: string;

  @Prop({ type: String })
  hashedRt?: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({type: String})
  passwordResetCode: string

  @Prop({type: Date})
  passwordResetCodeExpiresAt: Date

  @Prop({ type: String })
  zipCode: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({ type: Number, default: 0, immutable: true })
  eventCount: number;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Event' }] })
  userEvents: EventDocument;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);