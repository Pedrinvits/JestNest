import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/cria.usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { ListarUsuarioDTO } from "./dto/lista.usuario.dto";
import { AtualizaUsuarioDTO } from "./dto/atualiza.usuario.dto";
import { randomUUID } from "crypto";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuarioExistente = usuariosSalvos.find(usuario => usuario.email === dadosUsuario.email);

        if (usuarioExistente) {
            throw new BadRequestException('Email já cadastrado');
        }

        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosUsuario.email;
        usuarioEntity.nome = dadosUsuario.nome;
        usuarioEntity.id = randomUUID();

        await this.usuarioRepository.salvar(usuarioEntity);
        return {
            status: 201,
            id: usuarioEntity.id,
            message: 'Usuario criado com sucesso!'
        };
    }

    @Get()
    async listarUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListarUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        return {
            status: 200,
            usuario: usuariosLista,
            message: 'Usuario encontrado com sucesso!'
        };
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualizaUsuario(id, novosDados);

        if (!usuarioAtualizado) {
            throw new NotFoundException('Usuario não encontrado');
        }

        return {
            status: 200,
            usuario: usuarioAtualizado,
            message: 'Usuario atualizado com sucesso!'
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.removeUsuario(id);

        if (!usuarioRemovido) {
            throw new NotFoundException('Usuario não encontrado');
        }

        return {
            status: 200,
            usuario: usuarioRemovido,
            message: 'Usuario removido com sucesso!'
        };
    }
}
