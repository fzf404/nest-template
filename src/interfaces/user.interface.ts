import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: '用户名',
    example: 'fzf404',
  })
  readonly username: string;

  @Prop()
  @ApiProperty({
    description: '密码',
    example: '12345678',
  })
  readonly password: string;

  @Prop()
  readonly salt?: string;
}
