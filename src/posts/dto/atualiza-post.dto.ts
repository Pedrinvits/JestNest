import { IsOptional, IsString } from 'class-validator';

export class AtualizaPostDTO {
  @IsOptional()
  @IsString({ message: 'O título deve ser uma string válida' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'O conteúdo deve ser uma string válida' })
  conteudo?: string;

  @IsOptional()
  @IsString({ message: 'O ID do autor deve ser uma string válida' })
  autorId?: string;
}
