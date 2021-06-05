import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchma } from './schema/user.schema';

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
    MongooseModule.forRoot('mongodb://39.106.106.202/demo_nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    MONGO_MODELS],
  exports: [MONGO_MODELS]
})
export class DbModule { }
