import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  type: string;

  @Prop({ index: true }) // 指定索引，加速查询
  name: string;

  @Prop(mongoose.Schema.Types.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// 联合索引（1: ASC 升序, -1: DESC 降序）
EventSchema.index({ name: 1, type: -1 });
