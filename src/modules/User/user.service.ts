import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userData: UserDTO) {
    const UserExist = await this.prisma.user.findFirst({
      where: {
        email_user: userData.email_user,
      },
    });
    if (UserExist) {
      throw new NotFoundException('Usuário já existe');
    }
    if (userData.senha_user === userData.confirmar_senha_user) {
      const newUser = await this.prisma.user.create({
        data: {
          nome_apelido_user: userData.nome_apelido_user,
          email_user: userData.email_user,
          senha_user: userData.senha_user,
          confirmar_senha_user: userData.confirmar_senha_user,
        },
      });
      return newUser;
    } else {
      throw new NotFoundException('Senhas não correspondem');
    }
  }
  async finfAll() {
    return this.prisma.user.findMany();
  }
}
