import { randomUUID } from "crypto";

export class PostEntity {
  id: string;
  titulo: string;
  conteudo: string;
  autorId: string; 
  dataCriacao: Date;

  constructor(titulo: string, conteudo: string, autorId: string) {
    this.id = randomUUID();
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.autorId = autorId;
    this.dataCriacao = new Date();
  }
}
