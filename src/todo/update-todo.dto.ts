import { IsEnum, MaxLength, MinLength } from 'class-validator';
import { ErrorMessages } from './error-messages';
import { TodoStatusEnum } from './todo-status.enum';

export class UpdateTodoDTO {
  @MinLength(3, {
    message: ErrorMessages.name.short,
  })
  @MaxLength(10, {
    message: ErrorMessages.name.long,
  })
  name: string;
  @MinLength(10, {
    message: ErrorMessages.description.short,
  })
  description: string;
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
