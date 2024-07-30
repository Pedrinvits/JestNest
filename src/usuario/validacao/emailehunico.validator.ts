import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async : true})
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(private usuarioRepository: UsuarioRepository) {}
    async validate(value: any, _validationArguments?: ValidationArguments): Promise<boolean> {
        const usuariocomemailexiste = await this.usuarioRepository.existeEmail(value)
        return !usuariocomemailexiste;
    }
}

// Decorator
export const EmailEhUnico = (opcaoesDeValidacao : ValidationOptions) => {
    return (objeto : Object, propriedade : string) => {
        registerDecorator({
            target : objeto.constructor,
            propertyName : propriedade,
            options : opcaoesDeValidacao,
            constraints : [],
            validator : EmailEhUnicoValidator,
        })
    }
}