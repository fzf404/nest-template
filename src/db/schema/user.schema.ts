import { SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/interfaces/user.interface'

export const UserSchma = SchemaFactory.createForClass(User)