import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.types';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {
  }

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }

  @Post()
  async create(@Body() params: CreateUserDTO) {
    this.userRepository.save(params);

    return params;
  }
}
