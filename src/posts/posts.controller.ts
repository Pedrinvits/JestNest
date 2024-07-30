import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { PostRepository } from './posts.repository';
import { AtualizaPostDTO } from './dto/atualiza-post.dto';
import { CriaPostDTO } from './dto/cria-post.dto';
import { RetornoPostDTO } from './dto/retorno-post.dto';


@Controller('/posts')
export class PostsController {
  constructor(private postRepository: PostRepository) {}

  @Post()
  async criaPost(@Body() dadosPost: CriaPostDTO): Promise<{ status: number; id: string; message: string }> {
    const postEntity = new PostEntity(dadosPost.titulo, dadosPost.conteudo, dadosPost.autorId);

    await this.postRepository.salvar(postEntity);
    return {
      status: 201,
      id: postEntity.id,
      message: 'Post criado com sucesso!',
    };
  }

  @Get()
  async listarPosts(): Promise<{ status: number; posts: RetornoPostDTO[]; message: string }> {
    const posts = await this.postRepository.listar();
    const postsDTO = posts.map(post => ({
      id: post.id,
      titulo: post.titulo,
      conteudo: post.conteudo,
      autorId: post.autorId,
      dataCriacao: post.dataCriacao,
    }));

    return {
      status: 200,
      posts: postsDTO,
      message: 'Posts encontrados com sucesso!',
    };
  }

  @Put('/:id')
  async atualizaPost(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizaPostDTO): Promise<{ status: number; post: RetornoPostDTO; message: string }> {
    const postAtualizado = await this.postRepository.atualizaPost(id, dadosDeAtualizacao);
    return {
      status: 200,
      post: {
        id: postAtualizado.id,
        titulo: postAtualizado.titulo,
        conteudo: postAtualizado.conteudo,
        autorId: postAtualizado.autorId,
        dataCriacao: postAtualizado.dataCriacao,
      },
      message: 'Post atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removePost(@Param('id') id: string): Promise<{ status: number; post: RetornoPostDTO; message: string }> {
    const postRemovido = await this.postRepository.removePost(id);
    return {
      status: 200,
      post: {
        id: postRemovido.id,
        titulo: postRemovido.titulo,
        conteudo: postRemovido.conteudo,
        autorId: postRemovido.autorId,
        dataCriacao: postRemovido.dataCriacao,
      },
      message: 'Post removido com sucesso!',
    };
  }
}
