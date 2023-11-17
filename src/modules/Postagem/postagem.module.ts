import { PrismaService } from 'src/database/PrismaService';
import { Module } from '@nestjs/common';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';
@Module({
  controllers: [PostagemController],
  providers: [PostagemService, PrismaService],
})
export class PostagemModule {}
