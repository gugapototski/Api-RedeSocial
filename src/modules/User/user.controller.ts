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

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post('cadastro')
  async create(@Body() data: UserDTO) {
    return this.UserService.create(data);
  }
  @Put('update/:id_user')
  async update(@Param('id_user') id_user: string, @Body() data: UserDTO) {
    return this.UserService.update(parseInt(id_user), data);
  }
  @Delete('delete/:id_user')
  async delete(@Param('id_user') id_user: string) {
    return this.UserService.Delete(parseInt(id_user));
  }
  @Get('Allusers')
  async findAll() {
    return this.UserService.finfAll();
  }
  @Get('findbyname/:nome_apelido_user')
  async findUserNome(@Param('nome_apelido_user') nome_apelido_user: string) {
    return this.UserService.findUserNome(nome_apelido_user);
  }
}
