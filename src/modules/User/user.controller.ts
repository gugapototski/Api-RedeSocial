import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post('cadastro')
  async create(@Body() data: UserDTO) {
    return this.UserService.create(data);
  }
  @Get('Allusers')
  async findAll() {
    return this.UserService.finfAll();
  }
}
