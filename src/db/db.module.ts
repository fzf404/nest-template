import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchma } from './schema/user.schema';

require('dotenv').config()

const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchma,
    collection: "user"
  }
])

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    MONGO_MODELS],
  exports: [MONGO_MODELS]
})
export class DbModule { }
