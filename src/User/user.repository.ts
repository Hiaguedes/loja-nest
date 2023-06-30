import { Injectable } from '@nestjs/common';
import { User } from './user.types';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async save(user: User) {
    this.users.push(user);
  }

  async findAll() {
    return this.users;
  }

  async userExistsByEmail(email: string) {
    const user = this.users.find((user) => email === user.email);

    return user !== undefined;
  }
}
