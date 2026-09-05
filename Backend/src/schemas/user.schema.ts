import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  RESIDENT = 'resident',
  SECTION = 'section',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.RESIDENT })
  role!: UserRole;

  // --- Resident-only fields ---
  @Prop()
  block?: string;

  @Prop()
  floor?: string;

  @Prop()
  unit?: string;

  // --- Section-only field ---
  // Links a section-type user to the Section document it represents.
  // Null for residents and admin.
  @Prop({ type: Types.ObjectId, ref: 'Section', default: null })
  sectionId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);