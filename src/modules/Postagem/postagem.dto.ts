import { ApiProperty } from '@nestjs/swagger';
export class PostagemDTO {
  id_postagem?: number;
  @ApiProperty()
  id_user_postagem: number;
  @ApiProperty()
  postagem_texto: string;
  @ApiProperty()
  like_qtd: number;
}
