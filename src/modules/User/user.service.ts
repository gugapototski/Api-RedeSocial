import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { Prisma, User, Postagem } from '@prisma/client';
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
  async UserExists(id_user: number) {
    const User = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    return User !== null;
  }
  async update(id_user: number, userData: UserDTO) {
    const UserExists = await this.UserExists(id_user);

    if (UserExists) {
      const UpdateUser = await this.prisma.user.update({
        data: {
          nome_apelido_user: userData.nome_apelido_user,
          email_user: userData.email_user,
          senha_user: userData.senha_user,
          confirmar_senha_user: userData.confirmar_senha_user,
        },
        where: {
          id_user: id_user,
        },
      });
      return UpdateUser;
    } else {
      throw new NotFoundException('Usuário não existe!');
    }
  }
  async Delete(id_user: number) {
    const UserExists = await this.UserExists(id_user);
    if (UserExists) {
      return await this.prisma.user.delete({
        where: {
          id_user: id_user,
        },
      });
    } else {
      throw new NotFoundException('Usuário não existe!');
    }
  }
  async findAll() {
    return this.prisma.user.findMany();
  }
  async findUserByName(nome_apelido_user: string) {
    const users = await this.prisma.user.findMany({
      where: {
        nome_apelido_user: {
          contains: nome_apelido_user,
          mode: 'insensitive', // Adicione esta linha para tornar a busca insensível a maiúsculas/minúsculas
        },
      },
    });
    if (users.length > 0) {
      return users;
    } else {
      throw new NotFoundException(
        'Nenhum usuário encontrado com o nome fornecido.',
      );
    }
  }
  async obterRankingUsuariosPopulares(): Promise<User[]> {
    const usuarios = await this.prisma.user.findMany({
      include: {
        postagem: true,
      },
    });

    // Ordenar usuários pelo número total de likes em suas postagens
    const usuariosOrdenados = usuarios.sort((a, b) => {
      const likesA = a.postagem.reduce(
        (total, postagem) => total + (postagem.like_qtd || 0),
        0,
      );
      const likesB = b.postagem.reduce(
        (total, postagem) => total + (postagem.like_qtd || 0),
        0,
      );
      return likesB - likesA;
    });

    return usuariosOrdenados;
  }
}
