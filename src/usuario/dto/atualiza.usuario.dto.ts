import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmailEhUnico } from "../validacao/emailehunico.validator";

export class AtualizaUsuarioDTO {
    @IsString({message : 'Digite um nome válido'})
    @IsOptional()
    @IsNotEmpty()
    nome : string;
    @IsEmail()
    @EmailEhUnico({message : 'Email já cadastrado'})
    @IsOptional()
    email : string;
}