import { Body, Controller, Delete, Post, Param, Get } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { comentarioDTO } from './comentario.fto';
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comentarios')
@Controller('comentario')
export class ComentarioController {
  constructor(private readonly ComentarioService: ComentarioService) {}

  @Post('cadastrarcomentario')
  @ApiOperation({ summary: 'Cadastrar Comentario' })
  @ApiCreatedResponse({ description: 'Comentario cadastrado!' })
  async create(@Body() data: comentarioDTO) {
    return this.ComentarioService.create(data);
  }
  @Delete('deletarcomentario/:id_comentario')
  @ApiOperation({ summary: 'Deletar Comentario' })
  @ApiCreatedResponse({ description: 'Comentario deletado!' })
  async delete(@Param('id_comentario') id_comentario: string) {
    return this.ComentarioService.delete(parseInt(id_comentario));
  }
  @Get('comentariobypost/:id_postagem')
  @ApiOperation({ summary: 'Ver Comentarios de um post' })
  @ApiCreatedResponse({ description: 'Busca realizada!' })
  async findByPost(@Param('id_postagem') id_postagem: string) {
    return this.ComentarioService.findByPost(parseInt(id_postagem));
  }
}
