import { ApiProperty } from '@nestjs/swagger';

export class comentarioDTO {
  id_comentario?: number;
  @ApiProperty()
  id_postagem: number;
  @ApiProperty()
  id_user_comentario: number;
  @ApiProperty()
  comentario_texto: string;
}
