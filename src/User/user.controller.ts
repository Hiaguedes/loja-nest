import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CriaUsuario.dto';
import { UserEntity } from './validations/User.entity';
import { v4 as uuidv4 } from 'uuid';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async findAll() {
    const users = await this.userRepository.findAll();

    const mapUsers = users.map((user) => {
      return new ListUserDTO(user.name, user.id);
    });

    return mapUsers;
  }

  @Post()
  async create(@Body() params: CreateUserDTO) {
    let newUser = new UserEntity();
    newUser = {
      ...params,
      id: uuidv4(),
    };

    this.userRepository.save(newUser);

    return {
      user: new ListUserDTO(newUser.name, newUser.id),
      message: 'Usuario criado com sucesso',
    };
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO){
    const userUpdated = await this.userRepository.update(id, newData);

    return {
      // user: new ListUserDTO(userUpdated.name, userUpdated. id),
      user: userUpdated,
      message: 'Usuario editado com sucesso',
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string){
    const possibleUser = await this.userRepository.delete(id);

    return {
      user: possibleUser,
      message: 'removido com sucesso',
    }
  }
}
