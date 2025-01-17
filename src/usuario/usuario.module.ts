import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/emailehunico.validator";

@Module({
    controllers : [UsuarioController],
    providers : [UsuarioRepository,EmailEhUnicoValidator]
})
export class UsuarioModule{

}