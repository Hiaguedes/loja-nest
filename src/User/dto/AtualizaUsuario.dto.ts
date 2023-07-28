import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validations/UniqueEmail';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsEmail(undefined, {
    message: 'Formato do email deve ser valido',
  })
  @IsUniqueEmail({ message: 'Ja existe usuario com este e-mail' })
  @IsOptional()
  email: string;

  @IsOptional()
  @MinLength(6, {
    message: 'O message deve ter pelo menos 6 caracteres',
  })
  password: string;
}
