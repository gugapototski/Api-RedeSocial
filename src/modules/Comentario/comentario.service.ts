import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { comentarioDTO } from './comentario.fto';

@Injectable()
export class ComentarioService {
  constructor(private prisma: PrismaService) {}

  async create(comentarioData: comentarioDTO) {
    const newComentario = await this.prisma.comentario.create({
      data: {
        id_postagem: comentarioData.id_postagem,
        id_user_comentario: comentarioData.id_user_comentario,
        comentario_texto: comentarioData.comentario_texto,
      },
    });
    return newComentario;
  }
  async comentarioExist(id_comentario: number) {
    const comentario = await this.prisma.comentario.findUnique({
      where: {
        id_comentario: id_comentario,
      },
    });
    return comentario !== null;
  }
  async delete(id_comentario: number) {
    const comentarioExist = await this.comentarioExist(id_comentario);

    if (comentarioExist) {
      return this.prisma.comentario.delete({
        where: {
          id_comentario: id_comentario,
        },
      });
    } else {
      throw new NotFoundException('O comentario não existe!');
    }
  }
  async findByPost(id_postagem: number) {
    return this.prisma.comentario.findMany({
      where: {
        id_postagem: id_postagem,
      },
    });
  }
}
