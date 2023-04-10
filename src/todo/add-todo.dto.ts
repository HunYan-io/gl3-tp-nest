import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ErrorMessages } from './error-messages';

export class AddTodoDTO {
  @MinLength(3, {
    message: ErrorMessages.name.short,
  })
  @MaxLength(10, {
    message: ErrorMessages.name.long,
  })
  @IsNotEmpty({
    message: ErrorMessages.name.isEmpty,
  })
  name: string;
  @MinLength(10, {
    message: ErrorMessages.description.short,
  })
  @IsNotEmpty({
    message: ErrorMessages.description.isEmpty,
  })
  description: string;
}
