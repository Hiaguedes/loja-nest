import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validations/UniqueEmail';

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'Nome nao pode ser vazio',
  })
  @IsString()
  name: string;

  @IsEmail(undefined, {
    message: 'Formato do email deve ser valido',
  })
  @IsUniqueEmail({ message: 'Ja existe usuario com este e-mail' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'O message deve ter pelo menos 6 caracteres',
  })
  password: string;
}
