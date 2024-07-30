import { IsNotEmpty, IsString } from 'class-validator';

export class CriaPostDTO {
  @IsString({ message: 'O título deve ser uma string válida' })
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  titulo: string;

  @IsString({ message: 'O conteúdo deve ser uma string válida' })
  @IsNotEmpty({ message: 'O conteúdo não pode estar vazio' })
  conteudo: string;

  @IsString({ message: 'O ID do autor deve ser uma string válida' })
  @IsNotEmpty({ message: 'O ID do autor não pode estar vazio' })
  autorId: string;
}
