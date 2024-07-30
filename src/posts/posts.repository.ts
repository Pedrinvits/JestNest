// post.repository.ts
import { Injectable } from '@nestjs/common';
import { PostEntity } from './posts.entity';

@Injectable()
export class PostRepository {
  private posts: PostEntity[] = [];

  private buscaPorId(id: string): PostEntity {
    const possivelPost = this.posts.find(postSalvo => postSalvo.id === id);

    if (!possivelPost) {
      throw new Error('Post não encontrado!');
    }
    return possivelPost;
  }

  async salvar(post: PostEntity) {
    this.posts.push(post);
  }

  async listar() {
    return this.posts;
  }

  async atualizaPost(id: string, dadosDeAtualizacao: Partial<PostEntity>) {
    const post = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      (post as any)[chave] = valor;
    });

    return post;
  }

  async removePost(id: string) {
    const post = this.buscaPorId(id);
    this.posts = this.posts.filter(postSalvo => postSalvo.id !== id);
    return post;
  }
}
