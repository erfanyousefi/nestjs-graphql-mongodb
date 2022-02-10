import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { type } from 'os';

@Schema()
export class Category {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}
export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
