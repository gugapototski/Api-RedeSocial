import { Module } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { PostagemModule } from './modules/Postagem/postagem.module';
import { ComentarioModule } from './modules/Comentario/comentario.module';

@Module({
  imports: [UserModule, PostagemModule, ComentarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
