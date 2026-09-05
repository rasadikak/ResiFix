import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Priority } from './complaint-title.schema';

export type SlaConfigDocument = SlaConfig & Document;

@Schema({ timestamps: true })
export class SlaConfig {
  @Prop({ required: true, enum: Priority, unique: true })
  priority!: Priority;
  // ASSUMPTION: SLA window is keyed by priority only (not category+priority),
  // since priority already determines urgency. Simpler than a full category
  // x priority matrix — revisit if you want per-category overrides later.

  @Prop({ required: true })
  resolutionHours!: number; // e.g. High = 6, Medium = 48, Low = 96
}

export const SlaConfigSchema = SchemaFactory.createForClass(SlaConfig);