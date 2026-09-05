import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Priority } from './complaint-title.schema';

export type ComplaintDocument = Complaint & Document;

export enum ComplaintStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  REOPENED = 'reopened',
}

const CommentSchema = {
  byUser: { type: Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};
// ASSUMPTION: comments are a running thread (array), not a single resolution
// note — lets resident and section go back and forth before/after resolution.

@Schema({ timestamps: true })
export class Complaint {
  @Prop({ type: Types.ObjectId, ref: 'ComplaintTitle', required: true })
  titleId!: Types.ObjectId;

  @Prop({ required: true })
  description!: string;

  @Prop([String])
  photos!: string[]; // Cloudinary URLs from resident's submission

  @Prop([String])
  afterPhotos!: string[]; // Cloudinary URLs added by section on resolution

  @Prop({ required: true })
  block!: string;

  @Prop()
  floor?: string;

  @Prop()
  unit?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  reportedBy!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Section', required: true })
  sectionId!: Types.ObjectId; // set at creation by the routing engine

  @Prop({ required: true, enum: ComplaintStatus, default: ComplaintStatus.OPEN })
  status!: ComplaintStatus;

  // ASSUMPTION: escalation is a separate boolean, not a status value —
  // so a complaint can be "in_progress" AND "escalated" at the same time,
  // rather than escalation replacing its actual workflow state.
  @Prop({ default: false })
  isEscalated!: boolean;

  @Prop({ required: true, enum: Priority })
  priority!: Priority; // copied from ComplaintTitle.defaultPriority at creation, Admin can override

  @Prop()
  slaDeadline!: Date; // calculated at creation: createdAt + SlaConfig.resolutionHours

  @Prop()
  resolvedAt?: Date;

  @Prop({ min: 1, max: 5 })
  rating?: number; // resident's post-resolution rating

  @Prop([CommentSchema])
  comments!: (typeof CommentSchema)[];
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);