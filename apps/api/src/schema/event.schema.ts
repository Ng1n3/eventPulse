import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserDocument } from './user.schema';


export type EventDocument = Event & Document;


@Schema()
export class Event {
  @Prop({ type: String, default: () => new mongoose.Types.ObjectId() })
  _id: string;

  @Prop({ type: String, unique: true, required: true})
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  about: string;

  @Prop({ type: Number, default: 0})
  price: number;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: [String],  required: true})
  tags: string[];

  @Prop({ type: [String],  required: true})
  speakers: string[];

  @Prop({ type: [String] })
  platform: string[];

  @Prop({ type: [String] })
  venue: string[];

  @Prop({ type: Number, immutable: true, default: 0})
  attendees: number;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
  eventUserId: UserDocument;

  @Prop({type:[{ type: mongoose.Types.ObjectId, ref: 'User' }]})
  createdBy: UserDocument;
}

export const EventSchema = SchemaFactory.createForClass(Event);