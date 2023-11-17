import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { PostagemDTO } from "./postagem.dto";

@Injectable()
export class PostagemService{
    constructor(private prisma:PrismaService){}

    async create(postagemData:PostagemDTO){
        const NewPost = await this.prisma.postagem.create({
            data: {
                id_user_postagem: postagemData.id_user_postagem,
                postagem_texto: postagemData.postagem_texto,
                like_qtd: postagemData.like_qtd
            }
        }); 
        return NewPost;
    }

    async PostExists(id_postagem: number) {
        const Post = await this.prisma.postagem.findUnique({
          where: {
            id_postagem: id_postagem,
          },
        });
        return Post !== null;
      }

    async delete(id_postagem: number){
        const PostExist = await this.PostExists(id_postagem);
        if (PostExist) {
            return await this.prisma.postagem.delete({
              where: {
                id_postagem: id_postagem,
              },
            });
          } else {
            throw new NotFoundException('Postagem não existe!');
          }
    }

    async finfAll() {
        return this.prisma.postagem.findMany();
    }

    async findPostById(id_postagem: number){
        const PostExist = await this.PostExists(id_postagem);
        if(PostExist){
            return this.prisma.postagem.findMany({
                where: {
                    id_postagem: id_postagem
                },
            });
        }else{
            throw new NotFoundException('Postagem não existe!');
        }
    }

    async findPostByIdUser(id_user_postagem: number){
        return this.prisma.postagem.findMany({
            where: {
                id_user_postagem: id_user_postagem
            },
        });
    }
}
