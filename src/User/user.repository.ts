import { Injectable } from '@nestjs/common';
import { UserEntity } from './validations/User.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async findAll() {
    return this.users;
  }

  async userExistsByEmail(email: string) {
    const user = this.users.find((user) => email === user.email);

    return user !== undefined;
  }

  async update(id: string, newData: Partial<UserEntity>) {
    const possibleUser = this.users.find((user) => user.id === id);

    if (!possibleUser) {
      throw new Error('usuario nao encontrado');
    }

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') return;

      possibleUser[key] = value;
    });

    return possibleUser;
  }

  async delete(id: string) {
    const possibleUser = this.users.find((user) => user.id === id);

    if (!possibleUser) {
      throw new Error('usuario nao encontrado');
    }

    this.users.filter((user) => user.id !== id);

    return possibleUser;

  }
}
