import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { AddTodoDTO } from './add-todo.dto';
import { UpdateTodoDTO } from './update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }
  @Post()
  addTodo(@Body() todoDto: AddTodoDTO): Todo {
    return this.todoService.addTodo(todoDto);
  }
  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }
  @Delete(':id')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
  @Patch(':id')
  updateTodoById(
    @Body() updateDto: UpdateTodoDTO,
    @Param('id') id: string,
  ): Todo[] {
    return this.todoService.updateTodoById(updateDto, id);
  }
}
