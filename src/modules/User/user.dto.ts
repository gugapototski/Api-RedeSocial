import { ApiProperty } from '@nestjs/swagger';
export class UserDTO {
  id_user?: number;
  @ApiProperty()
  nome_apelido_user: string;
  @ApiProperty()
  email_user: string;
  @ApiProperty()
  senha_user: string;
  @ApiProperty()
  confirmar_senha_user: string;
}
