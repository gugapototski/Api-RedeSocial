import { Body, Controller, Delete, Post, Param, Get } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { comentarioDTO } from './comentario.fto';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly ComentarioService: ComentarioService) {}

  @Post('cadastrarcomentario')
  async create(@Body() data: comentarioDTO) {
    return this.ComentarioService.create(data);
  }
  @Delete('deletarcomentario/:id_comentario')
  async delete(@Param('id_comentario') id_comentario: string) {
    return this.ComentarioService.delete(parseInt(id_comentario));
  }
  @Get('comentariobypost/:id_postagem')
  async findByPost(@Param('id_postagem') id_postagem: string) {
    return this.ComentarioService.findByPost(parseInt(id_postagem));
  }
}
