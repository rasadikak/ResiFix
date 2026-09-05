import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComplaintTitleDocument = ComplaintTitle & Document;

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({ timestamps: true })
export class ComplaintTitle {
  @Prop({ required: true, unique: true, trim: true })
  title: string; // e.g. "Leaking Tap", "Elevator Malfunction"

  @Prop({ type: Types.ObjectId, ref: 'Section', required: true })
  sectionId: Types.ObjectId; // which section this title routes to

  @Prop({ required: true, enum: Priority, default: Priority.MEDIUM })
  defaultPriority: Priority;
  // ASSUMPTION: priority is set here as a default per title, and copied onto
  // the Complaint when created. Admin can still override it per-complaint
  // afterward (see `priority` field on Complaint below).
}

export const ComplaintTitleSchema = SchemaFactory.createForClass(ComplaintTitle);