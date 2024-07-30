import { PostEntity } from "./posts.entity";
import { PostRepository } from "./posts.repository";

describe('PostRepository', () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    postRepository = new PostRepository();
  });

  it('should save and list posts', async () => {
    const post = new PostEntity('Título 1', 'Conteúdo 1', 'Autor1');
    await postRepository.salvar(post);
    const posts = await postRepository.listar();

    expect(posts).toHaveLength(1);
    expect(posts[0]).toEqual(post);
  });

  it('should update a post', async () => {
    const post = new PostEntity('Título 2', 'Conteúdo 2', 'Autor2');
    await postRepository.salvar(post);

    const updatedData = { titulo: 'Título Atualizado', conteudo: 'Conteúdo Atualizado' };
    const updatedPost = await postRepository.atualizaPost(post.id, updatedData);

    expect(updatedPost.titulo).toBe('Título Atualizado');
    expect(updatedPost.conteudo).toBe('Conteúdo Atualizado');
  });

  it('should remove a post', async () => {
    const post = new PostEntity('Título 3', 'Conteúdo 3', 'Autor3');
    await postRepository.salvar(post);
    await postRepository.removePost(post.id);

    const posts = await postRepository.listar();
    expect(posts).toHaveLength(0);
  });

  it('should throw error if post not found during update or removal', async () => {
    expect(async () => {
      await postRepository.atualizaPost('invalid-id', { titulo: 'Teste' });
    }).rejects.toThrowError('Post não encontrado!');

    expect(async () => {
      await postRepository.removePost('invalid-id');
    }).rejects.toThrowError('Post não encontrado!');
  });
});
