import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/cria.usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza.usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let repository: UsuarioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioRepository,
          useValue: {
            salvar: jest.fn(),
            listar: jest.fn().mockResolvedValue([]),
            atualizaUsuario: jest.fn(),
            removeUsuario: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = new CriaUsuarioDTO();
    dto.email = 'test@example.com';
    dto.nome = 'Test User';

    const result = await controller.criaUsuario(dto);

    expect(result).toEqual({
      status: 201,
      id: expect.any(String),
      message: 'Usuario criado com sucesso!',
    });
    expect(repository.salvar).toHaveBeenCalledWith(expect.any(UsuarioEntity));
  });

  it('should not allow creating a user with duplicate email', async () => {
    const dto = new CriaUsuarioDTO();
    dto.email = 'duplicate@example.com';
    dto.nome = 'Duplicate User';

    const existingUser = new UsuarioEntity();
    existingUser.email = 'duplicate@example.com';
    existingUser.nome = 'Existing User';
    existingUser.id = 'existing-id';

    jest.spyOn(repository, 'listar').mockResolvedValue([existingUser]);

    await expect(controller.criaUsuario(dto)).rejects.toThrow(BadRequestException);
  });

  it('should list users', async () => {
    const usuarios = [
      { id: '1', nome: 'pedro', email: 'pedro@teste.com' },
      { id: '2', nome: 'joao', email: 'joao@teste.com' },
      { id: '2', nome: 'lucas', email: 'lucas@teste.com' },
    ];

    jest.spyOn(repository, 'listar').mockResolvedValue(usuarios);

    const result = await controller.listarUsuarios();

    expect(result).toEqual({
      status: 200,
      usuario: expect.any(Array),
      message: 'Usuario encontrado com sucesso!',
    });
    expect(result.usuario.length).toBe(3);
  });

  it('should return empty list when no users found', async () => {
    jest.spyOn(repository, 'listar').mockResolvedValue([]);

    const result = await controller.listarUsuarios();

    expect(result).toEqual({
      status: 200,
      usuario: [],
      message: 'Usuario encontrado com sucesso!',
    });
    expect(result.usuario.length).toBe(0);
  });

  it('should update a user', async () => {
    const id = '1';
    const dto = new AtualizaUsuarioDTO();
    dto.nome = 'Updated User';

    jest.spyOn(repository, 'atualizaUsuario').mockResolvedValue({
      id,
      nome: dto.nome,
      email: 'user1@example.com',
    });

    const result = await controller.atualizaUsuario(id, dto);

    expect(result).toEqual({
      status: 200,
      usuario: {
        id,
        nome: dto.nome,
        email: 'user1@example.com',
      },
      message: 'Usuario atualizado com sucesso!',
    });
  });

  it('should not update a non-existent user', async () => {
    const id = 'non-existent-id';
    const dto = new AtualizaUsuarioDTO();
    dto.nome = 'Non Existent User';

    jest.spyOn(repository, 'atualizaUsuario').mockResolvedValue(null);

    await expect(controller.atualizaUsuario(id, dto)).rejects.toThrow(NotFoundException);
  });

  it('should remove a user', async () => {
    const id = '1';

    jest.spyOn(repository, 'removeUsuario').mockResolvedValue({
      id,
      nome: 'User 1',
      email: 'user1@example.com',
    });

    const result = await controller.removeUsuario(id);

    expect(result).toEqual({
      status: 200,
      usuario: {
        id,
        nome: 'User 1',
        email: 'user1@example.com',
      },
      message: 'Usuario removido com sucesso!',
    });
  });

  it('should not remove a non-existent user', async () => {
    const id = 'non-existent-id';

    jest.spyOn(repository, 'removeUsuario').mockResolvedValue(null);

    await expect(controller.removeUsuario(id)).rejects.toThrow(NotFoundException);
  });
  it('should not allow creating a user with existing email after a valid user is created', async () => {
    const dto1 = new CriaUsuarioDTO();
    dto1.email = 'test@example.com';
    dto1.nome = 'Test User';

    const dto2 = new CriaUsuarioDTO();
    dto2.email = 'test@example.com';
    dto2.nome = 'Duplicate User';

    await controller.criaUsuario(dto1);

    jest.spyOn(repository, 'listar').mockResolvedValue([
      { ...dto1, id: '1' }
    ]);

    await expect(controller.criaUsuario(dto2)).rejects.toThrow(BadRequestException);
  });
});
