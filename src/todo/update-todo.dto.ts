import { TodoStatusEnum } from './todo-status.enum';

export class UpdateTodoDTO {
  name: string;
  description: string;
  status: TodoStatusEnum;
}
