import { IsString, IsDateString } from 'class-validator';

export class RetornoPostDTO {
  @IsString()
  id: string;

  @IsString()
  titulo: string;

  @IsString()
  conteudo: string;

  @IsString()
  autorId: string;

  @IsDateString()
  dataCriacao: Date;
}
