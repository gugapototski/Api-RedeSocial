import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastrar Usuário' })
  @ApiCreatedResponse({ description: 'Usuário cadastrado' })
  async create(@Body() data: UserDTO) {
    return this.UserService.create(data);
  }
  @Put('update/:id_user')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiParam({ name: 'id_user', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Usuário atualizado com sucesso' })
  async update(@Param('id_user') id_user: string, @Body() data: UserDTO) {
    return this.UserService.update(parseInt(id_user), data);
  }
  @Delete('delete/:id_user')
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiParam({ name: 'id_user', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Usuário deletado com sucesso' })
  async delete(@Param('id_user') id_user: string) {
    return this.UserService.Delete(parseInt(id_user));
  }
  @Get('Allusers')
  @ApiOperation({ summary: 'Ver todos os usuários' })
  @ApiCreatedResponse({ description: 'Busca realizada com sucesso' })
  async findAll() {
    return this.UserService.finfAll();
  }
  @Get('findbyname/:nome_apelido_user')
  @ApiOperation({ summary: 'Buscar um usuário pelo seu nome' })
  @ApiParam({
    name: 'nome_apelido_user',
    description: 'nome do usuário ou qualquer letra relacionada com seu nome.',
  })
  @ApiCreatedResponse({ description: 'Usuários compatíveis' })
  async findUserNome(@Param('nome_apelido_user') nome_apelido_user: string) {
    return this.UserService.findUserNome(nome_apelido_user);
  }
  @Get('ranking/populares')
  async obterRankingUsuariosPopulares() {
    try {
      const usuariosPopulares =
        await this.UserService.obterRankingUsuariosPopulares();
      return { success: true, data: usuariosPopulares };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
