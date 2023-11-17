import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostagemService } from './postagem.service';
import { PostagemDTO } from './postagem.dto';

@Controller('postagem')
export class PostagemController {
    constructor(private readonly PostagemService: PostagemService) {}
    @Post('cadastroPostagem')
    async cadastroPostagem(@Body() data: PostagemDTO){
        return this.PostagemService.create(data);
    }
    @Delete('deletarPostagem/:id_postagem')
    async deletarPostagem(@Param('id_postagem') id_postagem: string){
        return this.PostagemService.delete(parseInt(id_postagem));
    }
    @Get('AllPosts')
    async findAll(){
        return this.PostagemService.finfAll();
    }
    @Get('FindPostById/:id_postagem')
    async findPostById(@Param('id_postagem') id_postagem: string){
        return this.PostagemService.findPostById(parseInt(id_postagem));
    }
    @Get('findPostByIdUser/:id_user_postagem')
    async findPostByIdUser(@Param('id_user_postagem') id_user_postagem: string){
        return this.PostagemService.findPostByIdUser(parseInt(id_user_postagem));
    }
    @Put('likePostagem/:id_postagem')
    async likePostagem(@Param('id_postagem') id_postagem:string, @Body() data: PostagemDTO){
        return this.PostagemService.likePost(parseInt(id_postagem), data);
    }
}