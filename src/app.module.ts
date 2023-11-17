import { Module } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { PostagemModule } from './modules/Postagem/postagem.module';

@Module({
  imports: [UserModule, PostagemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}


