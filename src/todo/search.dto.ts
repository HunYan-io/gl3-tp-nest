import { TodoStatusEnum } from './todo-status.enum';

export class SearchDTO {
  criteria: string;
  status: TodoStatusEnum;
}
