import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true, unique: true, trim: true })
  name: string; // e.g. "Maintenance", "Security", "Housekeeping"

  @Prop({ default: true })
  isActive: boolean; // lets Admin disable a section without deleting its history
}

export const SectionSchema = SchemaFactory.createForClass(Section);