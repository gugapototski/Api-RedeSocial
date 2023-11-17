import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { PostagemDTO } from './postagem.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Postagens')
@Controller('postagem')
export class PostagemController {
  constructor(private readonly PostagemService: PostagemService) {}
  @Post('cadastroPostagem')
  @ApiOperation({ summary: 'Criar Postagem' })
  @ApiCreatedResponse({ description: 'Postagem Criada!' })
  async cadastroPostagem(@Body() data: PostagemDTO) {
    return this.PostagemService.create(data);
  }
  @Delete('deletarPostagem/:id_postagem')
  @ApiOperation({ summary: 'Deletar Postagem' })
  @ApiCreatedResponse({ description: 'Postagem deletada!' })
  async deletarPostagem(@Param('id_postagem') id_postagem: string) {
    return this.PostagemService.delete(parseInt(id_postagem));
  }
  @Put('likePostagem/:id_postagem')
  @ApiOperation({ summary: 'Dar like em uma postagem' })
  @ApiCreatedResponse({ description: 'Curtido com sucesso!' })
  async likePostagem(
    @Param('id_postagem') id_postagem: string,
    @Body() data: PostagemDTO,
  ) {
    return this.PostagemService.likePost(parseInt(id_postagem), data);
  }
  @Get('AllPosts')
  @ApiOperation({ summary: 'Ver todos os posts' })
  @ApiCreatedResponse({ description: 'Busca realizada!' })
  async findAll() {
    return this.PostagemService.finfAll();
  }
  @Get('FindPostById/:id_postagem')
  @ApiOperation({ summary: 'Buscar postagem pelo id_postagem' })
  @ApiCreatedResponse({ description: 'Busca realizada!' })
  async findPostById(@Param('id_postagem') id_postagem: string) {
    return this.PostagemService.findPostById(parseInt(id_postagem));
  }
  @Get('findPostByIdUser/:id_user_postagem')
  @ApiOperation({ summary: 'Buscar todos os posts de um usuário' })
  @ApiCreatedResponse({ description: 'Busca realizada!' })
  async findPostByIdUser(@Param('id_user_postagem') id_user_postagem: string) {
    return this.PostagemService.findPostByIdUser(parseInt(id_user_postagem));
  }
}
