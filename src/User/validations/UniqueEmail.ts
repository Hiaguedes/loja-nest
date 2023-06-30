import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: string, validationArguments?: ValidationArguments) {
    const userExist = await this.userRepository.userExistsByEmail(value);

    return !Boolean(userExist);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'user exists';
  }
}

export const IsUniqueEmail = (validationParams: ValidationOptions) => {
  return (object: object, props: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: props,
      options: validationParams,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
