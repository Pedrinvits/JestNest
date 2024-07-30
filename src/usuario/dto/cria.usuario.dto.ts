import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { EmailEhUnico } from "../validacao/emailehunico.validator";

export class CriaUsuarioDTO {
    @IsString({message : 'Digite um nome válido'})
    @IsNotEmpty()
    nome : string;
    @IsEmail()
    @EmailEhUnico({message : 'Email já cadastrado'})
    email : string;
}