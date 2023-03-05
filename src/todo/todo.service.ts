import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { AddTodoDTO } from './add-todo.dto';
import { TodoStatusEnum } from './todo-status.enum';
import { UpdateTodoDTO } from './update-todo.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class TodoService {
  public todos: Todo[] = [];

  constructor(private commonService: CommonService) {}
  getTodos() {
    return this.todos;
  }
  addTodo(todoDto: AddTodoDTO): Todo {
    const todo: Todo = {
      id: this.commonService.uniqueId(),
      name: todoDto.name,
      description: todoDto.description,
      createdAt: new Date(),
      status: TodoStatusEnum.waiting,
    };
    this.todos.push(todo);
    return todo;
  }
  getTodoById(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id.toString() === id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
  deleteTodoById(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.todos.splice(index, 1);
  }
  updateTodoById(updateDto: UpdateTodoDTO, id: string): Todo[] {
    for (const todo of this.todos) {
      if (todo.id === id) {
        todo.name = updateDto.name;
        todo.description = updateDto.description;
        todo.status = updateDto.status;
        break;
      }
    }
    return this.todos;
  }
}
