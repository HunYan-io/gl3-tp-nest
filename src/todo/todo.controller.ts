import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { AddTodoDTO } from './add-todo.dto';
import { UpdateTodoDTO } from './update-todo.dto';
import { SearchDTO } from './search.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }
  @Get()
  @Version('2')
  getTodosV2(@Query() query: SearchDTO & { page?: number; limit?: number }) {
    return this.todoService.getTodosV2(query, query.page, query.limit);
  }
  @Post()
  addTodo(@Body() todoDto: AddTodoDTO): Todo {
    return this.todoService.addTodo(todoDto);
  }
  @Post()
  @Version('2')
  addTodoV2(@Body() todoDto: AddTodoDTO) {
    return this.todoService.addTodoV2(todoDto);
  }
  @Get('count')
  @Version('2')
  countTodosByStatus(@Query('status') status: string) {
    return this.todoService.countTodosByStatus(status);
  }
  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }
  @Get(':id')
  @Version('2')
  getTodoByIdV2(@Param('id') id: number) {
    return this.todoService.getTodoByIdV2(id);
  }
  @Delete(':id')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
  @Delete(':id')
  @Version('2')
  deleteTodoByIdV2(@Param('id') id: number) {
    return this.todoService.deleteTodoByIdV2(id);
  }
  @Patch(':id')
  updateTodoById(
    @Body() updateDto: UpdateTodoDTO,
    @Param('id') id: string,
  ): Todo[] {
    return this.todoService.updateTodoById(updateDto, id);
  }
  @Patch(':id')
  @Version('2')
  updateTodoByIdV2(@Body() updateDto: UpdateTodoDTO, @Param('id') id: number) {
    return this.todoService.updateTodoByIdV2(updateDto, id);
  }
  @Post(':id/restore')
  @Version('2')
  restoreTodoById(@Param('id') id: number) {
    return this.todoService.restoreTodoById(id);
  }
}
